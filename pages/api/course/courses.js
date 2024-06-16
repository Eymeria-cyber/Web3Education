import { json } from 'stream/consumers'
import connectMongoDb from '../../../libs/db'
import Course from '../../../models/course'
import mongoose from 'mongoose'
const { handleMongooseError } = require('../../../libs/errorHandler')

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        //获取所有课程
        connectMongoDb()
        const { id } = req.query // 从查询参数中获取 id
        let courses
        if (id) {
          courses = await Course.findById(id) // 根据 id 查询特定课程
        } else {
          courses = await Course.find({}) // 获取所有课程
        }
        // console.log(courses.segments)
        res.status(200).json(courses)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching course.' })
      }
      break

    case 'POST':
      try {
        //创建新课程
        const newCourse = new Course(req.body)
        await newCourse.save()
        res.status(201).json(newCourse)
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
