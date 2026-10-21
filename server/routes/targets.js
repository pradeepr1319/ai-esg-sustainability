import { Router } from 'express'
import ESGTarget from '../models/ESGTarget.js'
const router = Router()
const demoTargets = [
  { name: 'Reduce carbon emissions', current: 68, target: 80, due: 'Dec 2026', category: 'Environmental' },
  { name: 'Renewable energy adoption', current: 42, target: 50, due: 'Mar 2027', category: 'Environmental' },
  { name: 'Waste diverted from landfill', current: 76, target: 80, due: 'Dec 2026', category: 'Environmental' },
  { name: 'Workforce training completion', current: 91, target: 95, due: 'Dec 2026', category: 'Social' }
]
router.get('/', async (req, res, next) => {
  try {
    if (ESGTarget.db.readyState !== 1) return res.json({ data: demoTargets, mode: 'demo' })
    res.json({ data: await ESGTarget.find({ organizationId: 'demo-org' }).sort({ createdAt: -1 }).lean(), mode: 'database' })
  } catch (e) { next(e) }
})
router.post('/', async (req, res, next) => {
  try {
    const { name, current, target, due, category } = req.body
    if (!name || !Number.isFinite(Number(current)) || !Number.isFinite(Number(target)) || !due || !['Environmental','Social','Governance'].includes(category)) return res.status(400).json({ error: 'Valid name, current, target, due, and category are required' })
    if (ESGTarget.db.readyState !== 1) return res.status(503).json({ error: 'Database is not connected' })
    const data = await ESGTarget.create({ name, current: Number(current), target: Number(target), due, category, organizationId: 'demo-org' })
    res.status(201).json({ data })
  } catch (e) { next(e) }
})
export default router
