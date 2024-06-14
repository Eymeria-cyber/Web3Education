import mongoose from 'mongoose'

const handleMongooseError = (error, res) => {
  let errorMessage = '保存课程时发生错误，请稍后重试'
  let statusCode = 500

  // 处理Mongoose验证错误
  if (error instanceof mongoose.Error.ValidationError) {
    errorMessage = '课程数据验证失败'
    statusCode = 400
    const validationErrors = {}
    for (const field in error.errors) {
      validationErrors[field] = error.errors[field].message
    }
    return res
      .status(statusCode)
      .json({ message: errorMessage, errors: validationErrors })
  }

  // 处理MongoDB唯一索引冲突错误
  if (error.code === 11000) {
    const duplicateKey = Object.keys(error.keyValue)[0]
    errorMessage = `字段 '${duplicateKey}' 的值重复，请提供唯一的值。`
    statusCode = 409
    return res.status(statusCode).json({ message: errorMessage })
  }

  // 其他Mongoose操作错误，如 CastError（类型转换错误）、VersionError（版本冲突错误）等
  if (error instanceof mongoose.Error) {
    switch (error.name) {
      case 'CastError':
        errorMessage = `字段类型错误: ${error.path} 必须是 ${error.kind} 类型。`
        statusCode = 400
        break
      case 'VersionError':
        errorMessage = '该文档已被其他请求修改，请刷新后重试。'
        statusCode = 409
        break
      // 可以继续添加其他Mongoose错误类型的处理
      default:
        // 未特别处理的Mongoose错误
        break
    }
  }

  // 日志记录错误详情
  console.error('数据库操作失败:', error)

  // 返回通用错误信息
  return res.status(statusCode).json({ message: errorMessage })
}
module.exports = { handleMongooseError }
