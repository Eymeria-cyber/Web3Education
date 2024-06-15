import mongoose from 'mongoose'

//注意要大写，开头必须，我也不知道为啥
const UserProgessSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    courseId: { type: String, required: true, unique: true }, //在进度表里，username会重复，但courseid和segmentid不会，任取一个作为唯一索引，防止出现重复数据
    segmentId: { type: String, required: true },
  },
  { timestamps: true }
)
let UserProgress

try {
  UserProgress = mongoose.model('UserProgress')
} catch {
  UserProgress = mongoose.model('UserProgress', UserProgessSchema)
}

export default UserProgress
