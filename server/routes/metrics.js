import { Router } from 'express'
import ESGMetric from '../models/ESGMetric.js'

const router = Router()
const demoMetrics = [
  { id: 'm1', category: 'Environmental', name: 'Scope 1 emissions', value: 128, unit: 'tCO₂e', period: 'Oct 2026', site: 'Chennai Plant', status: 'Reviewed' },
  { id: 'm2', category: 'Environmental', name: 'Scope 2 emissions', value: 422, unit: 'tCO₂e', period: 'Oct 2026', site: 'Chennai Plant', status: 'Verified' },
  { id: 'm3', category: 'Environmental', name: 'Renewable energy', value: 42, unit: '%', period: 'Oct 2026', site: 'All sites', status: 'Reviewed' },
  { id: 'm4', category: 'Environmental', name: 'Water withdrawal', value: 12500, unit: 'm³', period: 'Oct 2026', site: 'Chennai Plant', status: 'Verified' },
  { id: 'm5', category: 'Environmental', name: 'Waste recycled', value: 76, unit: '%', period: 'Oct 2026', site: 'All sites', status: 'Reviewed' }
]
router.get('/', async (req, res, next) => {
  try {
    if (ESGMetric.db.readyState !== 1) return res.json({ data: demoMetrics, mode: 'demo' })
    const data = await ESGMetric.find({ organizationId: 'demo-org' }).sort({ createdAt: -1 }).lean()
    res.json({ data, mode: 'database' })
  } catch (e) { next(e) }
})
router.post('/', async (req, res, next) => {
  try {
    const { category, name, value, unit, period = 'Oct 2026', site = 'Head Office' } = req.body
    if (!['Environmental', 'Social', 'Governance'].includes(category) || !String(name || '').trim() || !Number.isFinite(Number(value)) || !String(unit || '').trim()) {
      return res.status(400).json({ error: 'category, name, numeric value, and unit are required' })
    }
    if (ESGMetric.db.readyState !== 1) return res.status(503).json({ error: 'Database is not connected; use the frontend demo mode or configure MongoDB.' })
    const metric = await ESGMetric.create({ category, name: String(name).trim(), value: Number(value), unit: String(unit).trim(), period, site, status: 'Unverified', organizationId: 'demo-org' })
    res.status(201).json({ data: metric })
  } catch (e) { next(e) }
})
export default router
