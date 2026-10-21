import mongoose from 'mongoose'

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Starting API in demo-friendly mode without database.')
    return false
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
    return true
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    return false
  }
}
