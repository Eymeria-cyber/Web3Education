import { PronunciationAssessmentResult } from 'microsoft-cognitiveservices-speech-sdk'
import Progress from 'antd/lib/progress'
import Flex from 'antd/lib/flex'
import { User } from '@nextui-org/react'

const ScoreComponet = (result: PronunciationAssessmentResult) => {
  const colors = ['#f5222d', '#faad14', '#52c41a'] // 红色, 黄色, 绿色
  const getColor = (score: number): string => {
    return colors[Math.min(Math.floor(score / 30), 2)]
  }
  const getOverallRating = (result: PronunciationAssessmentResult) => {
    const { accuracyScore, pronunciationScore, fluencyScore, prosodyScore } =
      result
    const totalScore =
      (accuracyScore + pronunciationScore + fluencyScore + prosodyScore) / 4
    if (totalScore >= 80) return 'Excellent!!!'
    if (totalScore >= 50) return 'Good'
    return 'Oh no kid, you need Improvement!'
  }
  const overallRating = getOverallRating(result)
  return (
    <Flex wrap>
      <p className="ml-2 text-lg font-semibold align-middle levrelative">
        AccuracyScore
      </p>
      <Progress
        type="line"
        percent={result.accuracyScore}
        strokeColor={getColor(result.accuracyScore)}
        format={(percent) => percent}
      />
      <p className="ml-2 text-lg font-semibold align-middle levrelative">
        PronunciationScore
      </p>
      <Progress
        type="line"
        percent={result.pronunciationScore}
        strokeColor={getColor(result.pronunciationScore)}
        format={(percent) => percent}
      />
      <p className="ml-2 text-lg font-semibold align-middle levrelative">
        CompletenessScore
      </p>
      <Progress
        type="line"
        percent={result.completenessScore}
        strokeColor={getColor(result.completenessScore)}
        format={(percent) => percent}
      />
      <p className="ml-2 text-lg font-semibold align-middle levrelative">
        FluencyScore
      </p>
      <Progress
        type="line"
        percent={result.fluencyScore}
        strokeColor={getColor(result.fluencyScore)}
        format={(percent) => percent}
      />
      <p className="ml-2 text-lg font-semibold align-middle levrelative">
        ProsodyScore
      </p>
      <Progress
        type="line"
        percent={result.prosodyScore}
        strokeColor={getColor(result.prosodyScore)}
        format={(percent) => percent}
      />
      <User
        name="Frog Techer"
        description={overallRating}
        avatarProps={{
          src: '/icon.png',
        }}
      />
    </Flex>
  )
}

export default ScoreComponet
