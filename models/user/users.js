import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  phone: Number,
  username: { type: String, required: true, unique: true },
  displayName: String,
  profileUrl: String,
  avatarUrl: String,
  email: String,
})
let Users
try {
  /*warning:，Mongoose会自动将模型名称转换为复数形式作为其在MongoDB中的集合名称。
  这是Mongoose的一个约定，旨在遵循常见的数据库命名规范，即集合名称通常使用复数形式。
  */
  Users = mongoose.model('User') // 模型名称 'User' 是一个惯例，尽管 Mongoose 会将其转换为复数形式作为集合名称，但在定义模型时通常使用单数形式的名称。
} catch {
  //如果mongo已经有一个模型被定义，就直接返回这个模型。
  Users = mongoose.model('User', UserSchema)
}

export default Users
