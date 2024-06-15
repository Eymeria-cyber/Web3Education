import connectMongoDb from '../../../libs/db'
import { serialize } from 'cookie'

import Users from '../../../models/user/users'
const { encrypt, decrypt } = require('../../../libs/crypto')

export default async function handler(req, res) {
  try {
    const { phone } = req.body
    //连接数据库
    connectMongoDb()
    let user = await Users.findOne({ username: phone })
    // 如果用户不存在，创建新用户
    if (!user) {
      // 创建用户
      user = await Users.create({
        phone: phone,
        username: phone,
        displayName: phone,
      })
    }
    //存入cookie中
    const sessionData = { username: user.username, phone: user.phone }
    let encryptedSessionData = encrypt(JSON.stringify(sessionData))
    const cookie = serialize('currentUser', encryptedSessionData, {
      httpOnly: true,
      secure: 'user',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
    // 获取重定向路径，如果没有则默认跳转到首页
    const redirectTo = req.query.redirectTo || '/'
    res.status(200).json({ success: true })
  } catch (error) {
    console.log('why error?', error)
    res.status(500).json(error)
  }
}
