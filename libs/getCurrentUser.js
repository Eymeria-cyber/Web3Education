import { encrypt, decrypt } from './crypto'

function getCurrentUser(req) {
  const cookie = req.cookies['currentUser']
  const iv = req.cookies['iv']
  console.log(cookie)
  const decryptedSessionData = decrypt(cookie, iv)
  const currentUser = JSON.parse(decryptedSessionData)
  return currentUser
}

export default getCurrentUser
