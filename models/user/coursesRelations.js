import mongoose from 'mongoose'

const coursesRelationsSchema = new mongoose.Schema({
  username: { type: string, requir: true },
  courseId: { type: ObjectId, require },
  finish: { type: Boolean, default: true },
})

const coursesRelations = () => {
  try {
    return mongoose.model('coursesRelation')
  } catch {
    //如果mongo已经有一个模型被定义，就直接返回这个模型。
    return mongoose.model('coursesRelation', coursesRelationsSchema)
  }
}
export default coursesRelations
