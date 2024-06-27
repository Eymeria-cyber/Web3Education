import React, { useState, useEffect, useRef } from 'react'
import { Card, Tab, Textarea, Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'

import { IconType } from 'react-icons'
import { SegmentType } from '@/models/course'

type SegmentProps = {
  segment: SegmentType
}

export const Segment: React.FC<SegmentProps> = ({ segment }) => {
  const [showSubtitles, setShowSubtitles] = useState(false)

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles)
  }

  return (
    <Card className="my-4 mr-6 bg-gray-100">
      {/* {Icon === SlVolume2 ? (
        <SlVolume2 onClick={togglePlay} />
      ) : (
        <SlVolume1 onClick={togglePlay} />
      )} */}
      <div className="flex items-center">
        <audio
          controls
          src={`http://localhost:3000/${segment.audioUrl}`}
          className="mt-4"
        ></audio>
        <Button
          color="success"
          variant="solid"
          className="mt-2 bg-gradient-to-tr from-Green-500 to-yellow-500 text-white shadow-lg"
          size="md"
          onClick={toggleSubtitles}
        >
          {showSubtitles ? 'Hide' : 'Display'}
        </Button>
      </div>
      {showSubtitles && (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-bold">原文:</p>
          <p className="text-lg">{segment.englishSubtitle}</p>
          <p className="text-sm">{segment.chineseSubtitle}</p>
        </div>
      )}
    </Card>
  )
}
