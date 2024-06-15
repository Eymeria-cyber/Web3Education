const crypto = require('crypto')

// 确保使用与加密时相同的算法和密钥
const algorithm = 'aes-256-cbc'
const key = '12345678901234567890123456789012' // 确保这与加密时使用的key相同

function decrypt(encryptedData, iv) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(iv, 'hex')
  )

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

module.exports = {
  encrypt: (text) => {
    const iv = crypto.randomBytes(16) // 生成随机的 iv
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted,
    }
  },
  decrypt: decrypt,
}
