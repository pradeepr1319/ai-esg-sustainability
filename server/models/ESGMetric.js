import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  organizationId: { type: String, default: 'demo-org', index: true },
  category: { type: String, enum: ['Environmental', 'Social', 'Governance'], required: true },
  name: { type: String, required: true, trim: true },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  period: { type: String, default: 'Oct 2026' },
  site: { type: String, default: 'Head Office' },
  status: { type: String, enum: ['Unverified', 'Reviewed', 'Verified'], default: 'Unverified' },
}, { timestamps: true })

export default mongoose.model('ESGMetric', schema)
