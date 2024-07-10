import { useState, useEffect, useRef } from 'react'
import { main } from '../../../components/activity/pronunciationAssessment'
import ScoreComponet from './Score'
import * as settings from '../../../libs/speechSettings'
import { PronunciationAssessmentResult } from 'microsoft-cognitiveservices-speech-sdk'
import { IoChevronBack } from 'react-icons/io5'
import wavEncoder from 'wav-encoder'
import { saveAs } from 'file-saver'
import Flex from 'antd/lib/flex'
import VoiceSVG from './voiceSVG'
import _ from 'lodash'
import { NavPage } from '../../../components/BottomBar'
import { NextPageWithLayout } from '../../_app'
import RootLayout from '../../../components/RootLayout'
import style from './index.module.css'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Textarea } from '@nextui-org/input'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from '@nextui-org/react'

declare global {
  interface Window {
    webkitSpeechRecognition: any
    webkitAudioContext: any
  }
}

const AiPronunciationAssmentPage: NextPageWithLayout = () => {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const mediaRecorderRef = useRef<any>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [result, setResult] = useState<PronunciationAssessmentResult>()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const Back = () => {
    router.back()
  }
  const reference_text = `okay,thank you very much for the introduction Harry.good morning good afternoon good evening depending on where you are.so I'm here based in Singapore,so my name is YiLi.I'm associate professor at the College of Computing and Data Science from the NanYang Technological University`
  settings.setReference_text(reference_text)
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

  const getErrorTypeClass = (errorType: string) => {
    switch (errorType) {
      case 'Mispronunciation':
        return 'bg-yellow-500'
      case 'Insertion':
        return 'bg-red-500'
      case 'Omission':
        return 'bg-gray-500'
      default:
        return ''
    }
  }
  const blockStyle = {
    width: '10px',
    height: '10px',
    margin: '10px',
  }

  //保存为file
  const getAudioFile = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
    const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' })
    return audioFile
  }

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
          console.log(process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY)
          const audioUrl = URL.createObjectURL(audioBlob)
          const arrybuffer = await audioBlob.arrayBuffer()
          const audioContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)()
          const audioBuffer = await audioContext.decodeAudioData(arrybuffer)
          const leftChannel = audioBuffer.getChannelData(0) // 左声道 PCM 数据
          // const buffer = Buffer.from(arrybuffer)

          const whiteNoise1sec = {
            sampleRate: 44100,
            channelData: [leftChannel],
          }
          //这是一个异步操作，会导致buffer总是滞后。
          // wavEncoder.encode(whiteNoise1sec).then((buffer) => {
          //   settings.setSpeechBuffter(Buffer.from(buffer))
          // })
          const buffer = await wavEncoder.encode(whiteNoise1sec)
          settings.setSpeechBuffter(Buffer.from(buffer))
          setIsLoading(false)
          const result = await main(settings)
          setIsLoading(true)
          setResult(result)
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
  return (
    <div className="bg-stone-50 container mx-auto">
      <nav className="flex items-center justify-between h-12 md:h-full p-4">
        <button
          className="text-2xl flex item-center cursor-pointer text-black"
          onClick={Back}
        >
          <IoChevronBack className="flex item-center mt" />
          <span className="ml-2 text-lg font-semibold align-middle levrelative">
            Black
          </span>
        </button>
      </nav>
      <h3 className="justify-center flex p-2 font-semibold">
        Let&apos;s start practicing pronunciation
      </h3>
      <Textarea
        label="Description"
        placeholder={reference_text}
        className=""
      ></Textarea>
      <div className="justify-center">
        <Card
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] bg-stone-100  max-auto"
          shadow="sm"
        >
          <CardBody>
            <audio src={audioURL} controls className="w-full"></audio>
            <button
              className="rounded-full mt-10 w-8 h-8 m-auto flex items-center justify-center bg-white "
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              {VoiceSVG(isRecording)}
            </button>
          </CardBody>
        </Card>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ ...blockStyle }} className="bg-red-500"></div>
          <span>: Insertion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ ...blockStyle }} className="bg-gray-500"></div>
          <span>: Omission</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ ...blockStyle }} className="bg-yellow-500"></div>
          <span>: Mispronunciation</span>
        </div>
        {/* <a href={audioURL} download="recording.wav">
            Download Recording
          </a> */}
        <div className="mt-4">
          <div className={classNames(style.bubble, style.container)}>
            {result?.detailResult.Words.map((words, idx) => (
              <span
                key={idx}
                className={getErrorTypeClass(
                  words?.PronunciationAssessment?.ErrorType ?? 'Nothing'
                )}
              >
                {words.Word}{' '}
              </span>
            ))}
          </div>
        </div>
        <Flex wrap className="max-w-[98%] mx-auto ">
          {result && ScoreComponet(result)}
        </Flex>
      </div>
    </div>
  )
}
AiPronunciationAssmentPage.getLayout = (page) => (
  <RootLayout activePage={NavPage.Courses}>{page}</RootLayout>
)

export default AiPronunciationAssmentPage
