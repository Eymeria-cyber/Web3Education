import connectMongoDb from '../../../libs/db'
import getCurrentUser from '../../../libs/getCurrentUser'
import UserProgress from '../../../models/user/userProgress'
const { handleMongooseError } = require('../../../libs/errorHandler')

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        //开启数据库连接
        connectMongoDb()
        const { id } = req.query // 从查询参数中获取courseId
        const currentUser = getCurrentUser(req)
        const userProgress = await UserProgress.findOne({
          username: currentUser.username,
          courseId: id,
        }).lean() // 使用 lean() 方法以获得普通 JavaScript 对象
        console.log(userProgress)
        if (userProgress === null || userProgress === undefined) {
          res.status(200).json(0)
        } else {
          console.log(userProgress.segmentId)
          res.status(200).json(userProgress.segmentId)
        }
      } catch (error) {
        res.status(500).json({ error: 'Error fetching course.' })
        handleMongooseError(error, res)
      }
      break

    case 'POST':
      try {
        //创建新课程
        const currentUser = getCurrentUser(req)
        console.log(req.body)
        const segmentId = req.body.segmentId
        console.log(segmentId)
        const existingUserProgress = await UserProgress.findOne({
          username: currentUser.username,
          courseId: req.body.courseId, // 假设 req.body.courseId 是你要检查的课程ID
        })
        if (existingUserProgress) {
          // 更新记录
          existingUserProgress.segmentId = segmentId // 假设 req.body.segmentId 是你要更新的字段
          console.log(segmentId)
          await existingUserProgress.save()
          res.status(200).json(existingUserProgress)
        } else {
          // 如果不存在，创建新的记录
          const newUserProgress = new UserProgress({
            courseId: req.body.courseId, // 使用扩展运算符复制 req.body 中的所有属性(...req.body)
            username: currentUser.username, // 确保添加 username 属性
            segmentId: segmentId,
          })
          await newUserProgress.save()
          res.status(201).json(newUserProgress)
        }
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
