import React from 'react'
import { segment } from '.'
import { Card, Tab } from '@nextui-org/react'

type SegmentProps = {
  segment: segment
}

export const Segment: React.FC<SegmentProps> = ({ segment }) => {
  return (
    <Card className="my-4">
      <Tab className="mb-4">{segment.title}</Tab>
      <Tab className="mb-2">{segment.chineseSubtitle}</Tab>
      <Tab className="mb-2 text-gray-500">{segment.englishSubtitle}</Tab>
      <audio controls src={segment.audioUrl} className="mt-4">
        Your browser does not support the audio element.
      </audio>
    </Card>
  )
}
