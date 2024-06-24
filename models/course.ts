import mongoose, { InferSchemaType } from 'mongoose'
const SegmentSchema = new mongoose.Schema({
  _id: { type: Number, require: true },
  title: String,
  chineseSubtitle: String,
  englishSubtitle: String,
  audioUrl: String,
})
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  author: String,
  segments: [SegmentSchema],
  date: { type: Date, default: Date.now },
  free: { type: Boolean, default: false },
  pid: { type: String, required: true },
})
export type SegmentType = InferSchemaType<typeof SegmentSchema>
export type CourseType = InferSchemaType<typeof CourseSchema>
// 通过立即执行函数来关联Course到mongoose返回值类型，外部使用Course时会有类型提示
const Course = (() => {
  try {
    /*warning:，Mongoose会自动将模型名称转换为复数形式作为其在MongoDB中的集合名称。
    这是Mongoose的一个约定，旨在遵循常见的数据库命名规范，即集合名称通常使用复数形式。
    */
    return mongoose.model<CourseType>('Course')
  } catch {
    return mongoose.model<CourseType>('Course', CourseSchema)
  }
})()
export default Course
