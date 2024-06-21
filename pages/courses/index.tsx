import { Listbox, ListboxItem } from '@nextui-org/react'
import { NavPage } from '../../components/BottomBar'
import RootLayout from '../../components/RootLayout'
import { NextPageWithLayout } from '../_app'
import { MockCourseList } from './mock'
import { CourseCarousel } from './CourseCarousel'
import { CourseListItem } from './CourseListItem'
import React, { useEffect, useState } from 'react'

type Course = {
  id: string
  title: string
  free: boolean
  description: string
}

const CoursePage: NextPageWithLayout = () => {
  const [courseList, setCourseList] = useState<Course[]>([])
  useEffect(() => {
    fetch('api/course/courses')
      .then((response) => response.json())
      .then((data) => setCourseList(data))
      .catch((error) => console.error(error))
  }, [])
  return (
    <div>
      <CourseCarousel list={MockCourseList} />
      <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
        {courseList.map((course, index) => {
          return (
            <ListboxItem className="overflow-visible" key={index} textValue={`${course.title}:${course.description}`}>
              <CourseListItem course={{ ...course }} />
            </ListboxItem>
          )
        })}
      </Listbox>
    </div>
  )
}
CoursePage.getLayout = (page) => (
  <RootLayout activePage={NavPage.Courses}>{page}</RootLayout>
)

export default CoursePage
