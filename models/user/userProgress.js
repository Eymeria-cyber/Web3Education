import mongoose from 'mongoose'

const userProgessSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    SegmentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
)
const userProgress = () => {
  try {
    return mongoose.model('userProgress')
  } catch {
    //如果mongo已经有一个模型被定义，就直接返回这个模型。
    return mongoose.model('userProgress', userProgessSchema)
  }
}

export default userProgress
