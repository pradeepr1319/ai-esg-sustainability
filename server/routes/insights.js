import { Router } from 'express'
import { analyzeESG } from '../services/aiService.js'
const router = Router()
const demoInsights = [
  { id: 1, type: 'Opportunity', title: 'Renewable energy has room to scale', text: 'Renewables now supply 42% of tracked electricity. A 8-point increase would bring the portfolio to its 50% near-term goal.', impact: 'High impact' },
  { id: 2, type: 'Trend detected', title: 'Emissions trending in the right direction', text: 'Combined Scope 1 and 2 emissions declined across the last six reporting periods. Validate the trend against production volume.', impact: 'Positive signal' },
  { id: 3, type: 'Action suggested', title: 'Close the water-efficiency gap', text: 'Water withdrawal is still above the annual target. Start with a site-level leak audit and cooling-system review.', impact: 'Medium impact' }
]
router.get('/', (req, res) => res.json({ data: demoInsights, mode: 'demo' }))
router.post('/analyze', async (req, res, next) => {
  try {
    const summary = req.body?.summary
    if (!summary || typeof summary !== 'object') return res.status(400).json({ error: 'A metric summary object is required' })
    const result = await analyzeESG(summary)
    res.json(result)
  } catch (e) { next(e) }
})
export default router
