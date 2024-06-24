import { Document, Schema, model, models } from 'mongoose'
interface ICourseRelate extends Document {
  username: string
  courseId: string
  finish: boolean
  unlock: boolean
  createdAt?: Date
  updatedAt?: Date
}
const CoursesRelationsSchema: Schema<ICourseRelate> = new Schema(
  {
    username: { type: String, require: true },
    courseId: { type: String, require: true },
    finish: { type: Boolean, default: false },
    unlock: { type: Boolean, default: false },
  },
  { timestamps: true }
)
CoursesRelationsSchema.static(
  'SaveAndUpdate',
  async function SaveAndUpdate(
    this: typeof CoursesRelations,
    username: string,
    courseId: string,
    isFinished: boolean
  ): Promise<ICourseRelate> {
    const existCoursesRelate = await CoursesRelations.findOne({
      username: username,
      courseId: courseId,
    })
    if (existCoursesRelate) {
      // 如果找到了记录，则更新 isFinished 字段
      existCoursesRelate.finish = isFinished
      await existCoursesRelate.save()
      return existCoursesRelate
    } else {
      // 如果没有找到记录，则创建新记录
      console.log('检查为什么方法里为false了', isFinished)
      const newCourseRelate = await CoursesRelations.create({
        username: username,
        courseId: courseId,
        finish: isFinished,
      })
      return newCourseRelate
    }
  }
)

const CoursesRelations =
  models.CoursesRelations ||
  model<ICourseRelate>('CoursesRelations', CoursesRelationsSchema)
export default CoursesRelations
