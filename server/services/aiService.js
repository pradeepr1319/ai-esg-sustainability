export async function analyzeESG(summary) {
  const apiKey = process.env.AI_API_KEY
  if (!apiKey) {
    return {
      mode: 'demo',
      summary: 'AI provider is not configured. This demo insight is rule-based and should be validated before operational use.',
      recommendations: [
        'Validate activity data and emission factors before interpreting the trend.',
        'Compare metrics with production or service output to understand intensity changes.',
        'Assign an owner and due date to each sustainability action.'
      ]
    }
  }

  const base = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
  const response = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'system', content: 'You are an ESG analyst. Use only supplied facts, do not invent causes, distinguish observations from hypotheses, and return concise JSON with keys summary (string) and recommendations (array of strings). State when data is insufficient.' },
        { role: 'user', content: `Analyze this validated ESG metric summary and suggest practical next steps: ${JSON.stringify(summary)}` }
      ],
      response_format: { type: 'json_object' }
    })
  })
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`)
  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('AI provider returned an empty response')
  return { mode: 'live', ...JSON.parse(content) }
}
