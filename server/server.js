import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import metricsRouter from './routes/metrics.js'
import targetsRouter from './routes/targets.js'
import insightsRouter from './routes/insights.js'

const app = express()
let dbConnection

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use(async (req, res, next) => {
  dbConnection ||= connectDB()
  await dbConnection
  next()
})
app.use('/api/', rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false }))
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'Verdant ESG API', database: process.env.MONGODB_URI ? 'configured' : 'demo mode' }))
app.use('/api/metrics', metricsRouter)
app.use('/api/targets', targetsRouter)
app.use('/api/insights', insightsRouter)
app.use((req, res) => res.status(404).json({ error: 'Route not found' }))
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Unexpected server error' })
})

if (!process.env.VERCEL) {
  const port = Number(process.env.PORT || 5000)
  app.listen(port, () => console.log(`Verdant API listening on http://localhost:${port}`))
}

export default app
