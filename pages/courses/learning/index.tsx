import { NextPageWithLayout } from '../../_app'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Segment } from './Segment'
import RootLayout from '../../../components/RootLayout'
import { NavPage } from '../../../components/BottomBar'
import Flicking, { MoveEvent, WillChangeEvent } from '@egjs/react-flicking'
import { User, Link } from '@nextui-org/react'
import LearnButton from './LearnBottom'

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
      console.log(currentIndex)
      setCurrentIndex(currentIndex + 1)
    } else {
      // Handle completion of the course, e.g.,
      console.log('Course completed!')
    }
  }

  return (
    <div className="sm:">
      {segmentList.map((segment, index) => (
        <div
          style={{
            display: currentIndex >= index ? 'block' : 'none',
            // transform:
            //   currentIndex === index ? 'translateY(0)' : 'translateY(100%)',
            // transition: 'transform 0.3s',
          }}
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
      <LearnButton onClick={NextSegment}>
        {currentIndex === segmentList.length - 1 ? '完成课程' : '继续'}
      </LearnButton>
    </div>
  )
}

export default LearnPage
