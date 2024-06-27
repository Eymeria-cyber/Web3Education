import { useState, useEffect, useRef } from 'react'
import { main } from './pronunciationAssessment'
import * as settings from '../../../libs/speechSettings'
import { PronunciationAssessmentResult } from 'microsoft-cognitiveservices-speech-sdk'
import Flex from 'antd/lib/flex'
import Progress from 'antd/lib/progress'
import { green, red } from '@ant-design/colors'
import VoiceSVG from './voiceSVG'

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}
export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const mediaRecorderRef = useRef<any>(null)
  const audioChunksRef = useRef([])

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      if (isListening) {
        setTranscript('')
      }
      recognition.onresult = (event: any) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + event.results[i][0].transcript)
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
      }

      recognition.onerror = (event: any) => {
        console.error(event.error)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      if (isListening) {
        recognition.start()
      } else {
        recognition.stop()
      }

      return () => {
        recognition.stop()
      }
    } else {
      console.warn('Web Speech API is not supported in this browser.')
    }
  }, [isListening])

  const handleListen = () => {
    setIsListening((prevState) => !prevState)
  }

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        mediaRecorder.start()
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data)
        }

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/wav',
          })
          console.log(audioBlob)
          const audioUrl = URL.createObjectURL(audioBlob)
          const arrybuffer = await audioBlob.arrayBuffer()
          // const buffer = Buffer.from(arrybuffer)
          // settings.setSpeechBuffter(buffer)
          // const result = await main(settings)

          setAudioURL(audioUrl)
          console.log(audioUrl)
          audioChunksRef.current = []
        }
        setIsListening((prevState) => !prevState)
        setIsRecording(true)
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error)
      })
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    setIsListening((prevState) => !prevState)
  }
  const colors = ['#f5222d', '#faad14', '#52c41a'] // 红色, 黄色, 绿色
  const getColor = (score: number): string => {
    return colors[Math.min(Math.floor(score / 30), 2)]
  }
  return (
    <div style={{ padding: '20px' }}>
      <h1>Speech to Text and Audio Recording Demo</h1>
      {/* <button onClick={handleListen}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button> */}
      <button
        className="rounded-full mt-10 w-12 h-12 m-auto flex items-center bg-white"
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {VoiceSVG(isRecording)}
      </button>
      <p>{transcript}</p>
      {audioURL && (
        <div>
          <h2>Recorded Audio</h2>
          <audio src={audioURL} controls></audio>
          <a href={audioURL} download="recording.wav">
            Download Recording
          </a>

          <Flex wrap>
            <p>准确度分数</p>
            <Progress
              type="line"
              percent={70}
              strokeColor={getColor(70)}
              format={(percent) => percent}
            />
            <p>准确度分数</p>
            <Progress
              type="line"
              percent={70}
              strokeColor={getColor(70)}
              format={(percent) => percent}
            />
            <p>准确度分数</p>
            <Progress
              type="line"
              percent={70}
              strokeColor={getColor(70)}
              format={(percent) => percent}
            />
          </Flex>
        </div>
      )}
    </div>
  )
}
