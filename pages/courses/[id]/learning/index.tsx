import { NextPageWithLayout } from '../../../_app'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Segment } from './Segment'
import { GetServerSidePropsContext } from 'next'
import { User, Link, Progress } from '@nextui-org/react'
import LearnButton from './LearnBottom'
import { IoClose } from 'react-icons/io5'
import { SegmentType } from '@/models/course'

// export type SegmentType = {
//   _id: number
//   title: string
//   chineseSubtitle: string
//   englishSubtitle: string
//   audioUrl: string
// }
type Props = {
  initialSegments: SegmentType[]
  id: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  //因为在服务器端没有当前页面的上下文,所以URL没法使用相对路径
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/course/courses?id=${id}`
  )
  const data = await res.json()
  return {
    props: { initialSegments: data.segments, id: id },
  }
}

const LearnPage: NextPageWithLayout<Props> = (props) => {
  const router = useRouter()
  const [segmentList, setSegmentList] = useState<SegmentType[]>(
    props.initialSegments
  )
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [progressValue, setProgressValue] = useState(
    (currentIndex.valueOf() / segmentList.length) * 100
  ) //用valueof返回原始的数字，如果你用的是Number对象。Number和number是不一样的，比如==来比较的时候Number的数字或许相等，但当使用===时结果是不相等。也不能直接用来和number相除
  //获取用户进度。
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/course/userProgress?id=${props.id}`
        )
        const data = await res.json()
        if (data != 0) {
          setCurrentIndex(data)
          setProgressValue((data / segmentList.length) * 100)
          console.log(data)
        }
      } catch (error) {
        console.error('Error fetching user progress:', error)
      }
    }
    fetchUserProgress()
  }, []) //bug修复：之前在这里写入了currenctindex，导致每次点继续，currentindex有了变化就会执行一次useEffect

  //关闭，并保存进度。
  const Close = async () => {
    // 确保 currentIndex 是数字类型
    const segmentId = Number(currentIndex)
    let finish = false
    if (+currentIndex === segmentList.length) {
      finish = true
    }
    const response = await fetch('/api/course/userProgress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: props.id,
        segmentId: segmentId,
        isFinished: finish,
      }),
    })

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 请求成功后，可以执行一些操作，例如跳转到首页
    window.location.href = '/'
  }
  const NextSegment = () => {
    if (+currentIndex < segmentList.length) {
      console.log(progressValue)
      console.log(+currentIndex + 1)
      console.log(((+currentIndex + 1) / segmentList.length) * 100)
      setProgressValue(((+currentIndex + 1) / segmentList.length) * 100)
      setCurrentIndex(+currentIndex + 1)
    } else {
      // Handle completion of the course, e.g.,
      console.log('Course completed!')
    }
  }

  return (
    <div className="container md:max-auto">
      <nav className="flex items-center justify-between h-12 md:h-full p-4">
        <div className="text-2xl ">
          <IoClose onClick={Close} />
        </div>
        <Progress
          color="success"
          aria-label="Loading..."
          value={progressValue}
          className="p-4"
        />
      </nav>
      {segmentList.map((segment, index) => (
        <div
          key={segment._id}
          style={{
            display: currentIndex - 1 >= index ? 'block' : 'none',
            // transform:
            //   currentIndex === index ? 'translateY(0)' : 'translateY(100%)',
            // transition: 'transform 0.3s',
          }}
          className="ml-2 mt-2"
        >
          <User
            name="Frog Techer"
            description={'你这个年纪怎么睡得着的？'}
            avatarProps={{
              src: '/icon.png',
            }}
          />
          <Segment key={segment._id} segment={segment} />
        </div>
      ))}
      <LearnButton
        onClick={+currentIndex === segmentList.length ? Close : NextSegment}
      >
        {+currentIndex === segmentList.length ? '完成课程' : '继续'}
      </LearnButton>
    </div>
  )
}

export default LearnPage
