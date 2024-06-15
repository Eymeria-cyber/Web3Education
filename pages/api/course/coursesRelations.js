import connectMongoDb from '../../../libs/db'
import getCurrentUser from '../../../libs/getCurrentUser'
import CoursesRelations from '../../../models/user/coursesRelations'
const { handleMongooseError } = require('../../../libs/errorHandler')

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        //开启数据库连接
        connectMongoDb()
        const { courseId } = req.query // 从查询参数中获取courseId
        const currentUser = getCurrentUser(req)
        console.log([currentUser.username, courseId])
        const coursesRelations = await CoursesRelations.findOne({
          username: currentUser.username,
          courseId: courseId,
        }).lean() // 使用 lean() 方法以获得普通 JavaScript 对象
        res.status(200).json(coursesRelations)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching course.' })
      }
      break

    case 'POST':
      try {
        //创建新课程
        const newCoursesRelations = new CoursesRelations(req.body)
        console.log(req.body)
        await newCoursesRelations.save()
        res.status(201).json(newCoursesRelations)
      } catch (error) {
        handleMongooseError(error, res)
      }
      break

    //处理delete 或 Put 等不支持的res
    default:
      //告诉客户端值接收这两种请求
      res.setHeader('Allow', ['GET', 'POST'])
      //返回错误信息
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
