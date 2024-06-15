import { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDb from '../../../libs/db'
import userProgess from '../../../models/user/userProgress'
import { encrypt, decrypt } from '../../../libs/crypto'
import { NextResponse } from 'next/server'

export default async function handler(req, res) {
  connectMongoDb()
  const courseId = req.query.courseId // 从路径参数中获取
  let cookie = req.cookies.get('currentUser')
  const decryptedSessionData = decrypt(cookie.toString())
  console.log(cookie)
  // 根据 courseId 和 username 查找进度
  try {
    console.log(decryptedSessionData)
    const currentUser = JSON.parse(decryptedSessionData)
    const username = currentUser.username
    const progress = await userProgess
      .findOne({
        username: username,
        courseId: courseId,
      })
      .lean() // 使用 lean() 方法以获得普通 JavaScript 对象而非

    return res.status(200).json(progress)
  } catch (error) {
    console.error('Error fetching course details:', error)
    return res.status(500).json({ message: 'Error fetching course details' })
  }
}
