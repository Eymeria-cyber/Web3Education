import { NextPageWithLayout } from '../../_app'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Segment } from './Segment'
import RootLayout from '../../../components/RootLayout'
import { NavPage } from '../../../components/BottomBar'

export type segment = {
  _id: number
  title: string
  chineseSubtitle: string
  englishSubtitle: string
  audioUrl: string
}
const LearnPage: NextPageWithLayout = () => {
  const router = useRouter()
  const [segmentList, setSegmentList] = useState<segment[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const { id } = router.query
    if (id) {
      //一定要检查id，查询API可能会触发多次，其中有两次没有获取到id时就会用空数据把数组挤掉。
      fetch(`/api/course/courses?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSegmentList(data.segments)
        })
        .catch((error) => console.error(error))
    }
  }, [router.query])

  const NextSegment = () => {
    if (currentIndex < segmentList.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Handle completion of the course, e.g.,
      console.log('Course completed!')
    }
  }

  const PrevSegment = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  return (
    <div>
      {segmentList.map((segment, index) => (
        <div
          style={{ display: currentIndex === index ? 'inline-block' : 'none' }}
        >
          <Segment key={segment._id} segment={segment} />
        </div>
      ))}
      <button
        onClick={PrevSegment}
        style={{ display: currentIndex > 0 ? 'inline-block' : 'none' }}
      >
        上一句
      </button>
      <button onClick={NextSegment}>
        {currentIndex < segmentList.length - 1 ? '下一句' : '完成课程'}
      </button>
    </div>
  )
}

export default LearnPage
