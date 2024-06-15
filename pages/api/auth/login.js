import connectMongoDb from '../../../libs/db'
import { serialize } from 'cookie'

import Users from '../../../models/user/users'
const { encrypt, decrypt } = require('../../../libs/crypto')

export default async function handler(req, res) {
  try {
    const { phone } = req.body
    console.log(phone)
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
    console.log(sessionData)
    let encryptedSessionData = encrypt(JSON.stringify(sessionData))
    console.log(encryptedSessionData)
    const cookie1 = serialize(
      'currentUser',
      encryptedSessionData.encryptedData,
      {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      }
    )
    const cookie2 = serialize('iv', encryptedSessionData.iv, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    const i = decrypt(
      encryptedSessionData.encryptedData,
      encryptedSessionData.iv
    )
    console.log(i)
    res.setHeader('Set-Cookie', [cookie1, cookie2])
    // 获取重定向路径，如果没有则默认跳转到首页
    const redirectTo = req.query.redirectTo || '/'
    res.status(200).json({ success: true })
  } catch (error) {
    console.log('why error?', error)
    res.status(500).json(error)
  }
}
