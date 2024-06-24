import { NavPage } from '../../components/BottomBar'
import RootLayout from '../../components/RootLayout'
import { NextPageWithLayout } from '../_app'
import { MockCourseList } from './mock'
import { CourseCarousel } from './CourseCarousel'
import { CourseListItem } from './CourseListItem'
import React, { useEffect, useMemo, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { parseAbi } from 'viem'
import { StakeContractConstant } from '@/contract'
import { ConnectButton } from '@rainbow-me/rainbowkit'

type Course = {
  _id: string
  title: string
  free: boolean
  description: string
  pid: string
}

const CoursePage: NextPageWithLayout = () => {
  const [freeCourseList, setFreeCourseList] = useState<Course[]>([]) // db 免费课程
  const [stakeRequiredCourseList, setStakeRequiredCourseList] = useState<Course[]>([]) // db 需要质押课程
  useEffect(() => {
    fetch('api/course/courses')
      .then((response) => response.json())
      .then((data) => {
        const free = data.filter((course: Course) => course.free)
        const staked = data.filter((course: Course) => !course.free)
        setFreeCourseList(free)
        setStakeRequiredCourseList(staked)
      })
      .catch((error) => console.error(error))
  }, [])

  const { isConnected, address } = useAccount()
  const getUserProjectsResult = useReadContract({
    address: StakeContractConstant.Address,
    abi: parseAbi([StakeContractConstant.Contract.getUserProjects.signatures]),
    functionName: StakeContractConstant.Contract.getUserProjects.functionName,
    args: [address!]
  })
  const { data: userStakedCourseList } = getUserProjectsResult // 用户已经质押的课程

  const userStakeCourseList = useMemo<(Course & { staked: boolean })[]>(() => {  // db 和 链上合并的课程
    if (!userStakedCourseList) return stakeRequiredCourseList.map(course => ({ ...course, staked: false }))
    const userProjects = new Set(userStakedCourseList)
    return stakeRequiredCourseList.map(course => ({
      ...course,
      staked: userProjects.has(BigInt(course.pid))
    }))
  }, [userStakedCourseList, stakeRequiredCourseList])
  useEffect(() => {
    console.log('=======', stakeRequiredCourseList, userStakedCourseList)
  }, [stakeRequiredCourseList, userStakedCourseList])
  return (
    <div className="flex flex-col gap-4">
      <CourseCarousel list={MockCourseList} />
      <div className="flex flex-col gap-4 mx-4" >
        {freeCourseList.map((course, index) => {
          return (
            <CourseListItem
              key={course._id}
              course={{ ...course, completed: false, claimed: false, staked: false }}
            />
          )
        })}
        {!isConnected && <div className='flex justify-center w-full'> <ConnectButton label='Connect Wallet and Stake to Unlock' /></div>}
        <div className='flex flex-col gap-4' style={{
          filter: !isConnected ? 'blur(10px)' : undefined
        }}>
          {userStakeCourseList.map(course => {
            const { _id, description, title, staked, pid } = course
            return <CourseListItem key={_id} course={
              {
                _id,
                title,
                description,
                free: false,
                completed: false,
                claimed: false,
                staked,
                pid
              }
            } />
          })}
        </div>
      </div>
    </div>
  )
}
CoursePage.getLayout = (page) => (
  <RootLayout activePage={NavPage.Courses}>{page}</RootLayout>
)

export default CoursePage
