import { serialize } from 'cookie'

export default async function logoutHandler(req, res) {
  try {
    // 创建一个过期的cookie来清除用户会话
    const cookie = serialize('currentUser', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 确保在生产环境中使用 secure 属性
      maxAge: -1, // 设置为过期
      path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
    res.status(200).json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.log('Logout error:', error)
    res.status(500).json({ success: false, message: 'Logout failed', error })
  }
}
