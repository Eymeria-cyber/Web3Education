import { Listbox, ListboxItem } from '@nextui-org/react'
import { NavPage } from '../../components/BottomBar'
import RootLayout from '../../components/RootLayout'
import { NextPageWithLayout } from '../_app'
import { MockCourseList } from './mock'
import { CourseCarousel } from './CourseCarousel'
import { CourseListItem } from './CourseListItem'
import React, { useEffect, useMemo, useState } from 'react'
import { useReadContract } from 'wagmi'
import { parseAbi } from 'viem'
import { StakeContractConstant } from '@/contract'

type Course = {
  id: string
  title: string
  free: boolean
  description: string
}

const CoursePage: NextPageWithLayout = () => {
  const [freeCourseList, setFreeCourseList] = useState<Course[]>([])
  useEffect(() => {
    fetch('api/course/courses')
      .then((response) => response.json())
      .then((data) => setFreeCourseList(data.filter((course: Course) => course.free)))
      .catch((error) => console.error(error))
  }, [])
  const getAllProjectsResult = useReadContract({
    address: StakeContractConstant.Address,
    abi: parseAbi([StakeContractConstant.Contract.getAllProjects.signatures]),
    functionName: 'getAllProjects',
  })
  const { isFetched, data } = getAllProjectsResult
  const chainCourseList = useMemo(() => {
    // TODO: 关联数据库user-course id
    if (isFetched) return data ?? []
    return []
  }, [isFetched, data])
  useEffect(() => {
    console.log('=======', getAllProjectsResult)
  }, [getAllProjectsResult])
  return (
    <div className='flex flex-col gap-4'>
      <CourseCarousel list={MockCourseList} />
      <div className='flex flex-col gap-4 mx-4'>
        {freeCourseList.map((course, index) => {
          return (
            <CourseListItem key={index} course={{ ...course, completed: false, claimed: false }} />
          )
        })}

        {chainCourseList.map(course => {
          const { id, completed, description, name } = course
          return <CourseListItem key={id} course={
            {
              id: id.toString(),
              title: name,
              description,
              free: false,
              completed,
              claimed: false
            }
          } />
        })}
      </div>

    </div>
  )
}
CoursePage.getLayout = (page) => (
  <RootLayout activePage={NavPage.Courses}>{page}</RootLayout>
)

export default CoursePage
