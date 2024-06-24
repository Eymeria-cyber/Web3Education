import { NextApiRequest, NextApiResponse } from "next";
import Course from "@/models/course";
import connectMongoDb from "../../../../libs/db";

// 获取course详情，用户无关。
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDb()
    const courseId = req.query.courseId!.toString()
    const course = await Course.findById(courseId)
    if (course === null) return res.status(404).json(`courseId: ${courseId} not found`)
    return res.status(200).json(course)
}