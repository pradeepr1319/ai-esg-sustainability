import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  organizationId: { type: String, default: 'demo-org', index: true },
  name: { type: String, required: true },
  current: { type: Number, required: true, min: 0 },
  target: { type: Number, required: true, min: 0 },
  due: { type: String, required: true },
  category: { type: String, enum: ['Environmental', 'Social', 'Governance'], required: true },
}, { timestamps: true })

export default mongoose.model('ESGTarget', schema)
