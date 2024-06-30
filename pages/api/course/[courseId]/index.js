import { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDb from '../../../../libs/db'
import UserProgress from '../../../../models/user/userProgress'
import { encrypt, decrypt } from '../../../../libs/crypto'
import { handleMongooseError } from '../../../../libs/errorHandler'

export default async function handler(req, res) {
  await connectMongoDb()

  if (req.method === 'GET') {
    const courseId = req.query.courseId.toString() // 从路径参数中获取
    const cookie = req.cookies['currentUser']
    const iv = req.cookies['iv']
    const decryptedSessionData = decrypt(cookie, iv)
    // 根据 courseId 和 username 查找进度
    try {
      const currentUser = JSON.parse(decryptedSessionData)
      const username = currentUser.username

      const progress = await UserProgress.findOne({
        username: username,
        courseId: courseId,
      }).lean() // 使用 lean() 方法以获得普通 JavaScript 对象
      return res.status(200).json(progress.segmentId)
    } catch (error) {
      console.error('Error fetching course details:', error)
      return res.status(500).json({ message: 'Error fetching course details' })
    }
  } else if (req.method === 'POST') {
    const { username, courseId, segmentId } = req.body // 从请求体中获取数据
    try {
      const newProgress = new UserProgress({
        username: username,
        courseId: courseId,
        segmentId: segmentId,
      })
      await newProgress.save()
      return res.status(201).json(newProgress)
    } catch (error) {
      handleMongooseError(error, res)
      return res.status(500).json({ message: 'Error saving user progress' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
