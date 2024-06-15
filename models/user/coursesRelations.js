import mongoose from 'mongoose'

const CoursesRelationsSchema = new mongoose.Schema({
  username: { type: String, require: true },
  courseId: { type: String, require },
  finish: { type: Boolean, default: false },
  unlock: { type: Boolean, default: false },
})

let CoursesRelations

try {
  CoursesRelations = mongoose.model('CoursesRelations')
} catch {
  CoursesRelations = mongoose.model('CoursesRelations', CoursesRelationsSchema)
}

export default CoursesRelations
