import mongoose from 'mongoose'
const SegmentSchema = new mongoose.Schema({
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
  hidden: { type: Boolean, default: true },
})
let Course
try {
  /*warning:，Mongoose会自动将模型名称转换为复数形式作为其在MongoDB中的集合名称。
  这是Mongoose的一个约定，旨在遵循常见的数据库命名规范，即集合名称通常使用复数形式。
  */
  Course = mongoose.model('Course')
} catch {
  //如果mongo已经有一个模型被定义，就直接返回这个模型。
  Course = mongoose.model('Course', CourseSchema)
}
export default Course
