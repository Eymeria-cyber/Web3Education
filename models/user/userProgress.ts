import { Document, Schema, model, models } from 'mongoose'
interface IProgress extends Document {
  username: string
  courseId: string
  segmentId: string
  createdAt?: Date
  updatedAt?: Date
}

//注意要大写，开头必须，我也不知道为啥
const UserProgressSchema: Schema<IProgress> = new Schema(
  {
    username: { type: String, required: true },
    courseId: { type: String, required: true }, //在进度表里，username会重复，但courseid和segmentid不会，任取一个作为唯一索引，防止出现重复数据
    segmentId: { type: String, required: true },
  },
  { timestamps: true }
)
//不要用let，否则类型会变成any
const UserProgress =
  models.UserProgress || model<IProgress>('UserProgress', UserProgressSchema)

export default UserProgress
