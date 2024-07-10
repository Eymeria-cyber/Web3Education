import { NextApiRequest, NextApiResponse } from 'next'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import * as fs from 'fs'
import _ from 'lodash'
import * as speechSettings from '../../../libs/speechSettings'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { audio: Buffer } = req.body
  const referenceText =
    'Internet es una enorme red de dispositivos interconectados mundialmente gracias a millones de kilómetros de cables de fibra óptica que pasan por debajo de los océanos. Para poder viajar, los archivos deben convertirse a un lenguaje que entiendan las computadoras. Ese es el LENGUAJE DE MÁQUINA y es de tipo BINARIO, porque solo tiene dos valores: 1 y 0. Combinando esos dos valores se generan todos los tipos de contenidos que ves y escuchás en cualquier dispositivo. ¡Increíble! ¿No?. Además, para llegar más velozmente (y que no te aburras esperando), los archivos se dividen en pequeñas partes, llamadas PAQUETES DE DATOS, que toman el mejor camino disponible hasta a tu dispositivo. Para lograrlo, los paquetes viajan por el mundo a través de la inmensa red de cables DE FIBRA ÓPTICA SUBMARINOS, redirigiéndose por varios ROUTERS. En tu dispositivo, que puede estar conectado a internet a través de un CABLE o INALÁMBRICAMENTE (gracias a tu MÓDEM), los pequeños paquetes se unen formando el archivo que habías solicitado y aparecen de forma completa.'
  console.log('进来了吗')
  var speechConfig = sdk.SpeechConfig.fromSubscription(
    speechSettings.subscriptionKey,
    speechSettings.serviceRegion
  )

  const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
    '',
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    true
  )

  const audioConfig = sdk.AudioConfig.fromWavFileInput(
    fs.readFileSync('./public/3cc82256-4b64-4197-a542-e23cfc90caf4.wav')
  )

  const reco = new sdk.SpeechRecognizer(speechConfig, audioConfig)
  pronunciationAssessmentConfig.applyTo(reco)

  console.log(audioConfig)
  function onRecognizedResult(result: any) {
    console.log('pronunciation assessment for:', result)
    const pronunciation_result =
      sdk.PronunciationAssessmentResult.fromResult(result)
    console.log(pronunciation_result)
    console.log(
      ' Accuracy score:',
      pronunciation_result.accuracyScore,
      '\n',
      'pronunciation score:',
      pronunciation_result.pronunciationScore,
      '\n',
      'completeness score :',
      pronunciation_result.completenessScore,
      '\n',
      'fluency score:',
      pronunciation_result.fluencyScore
    )
    console.log('  Word-level details:')
    for (const [
      idx,
      word,
      // @ts-ignore
    ] of pronunciation_result.detailResult.Words.entries()) {
      console.log(
        '    ',
        idx + 1,
        ': word:',
        word.Word,
        '\taccuracy score:',
        word.PronunciationAssessment?.AccuracyScore,
        '\terror type:',
        word.PronunciationAssessment?.ErrorType,
        ';'
      )
    }
    reco.close()
  }
  reco.recognizeOnceAsync(function (successfulResult: any) {
    console.log('调用回调')
    onRecognizedResult(successfulResult)
  })

  res.status(405).end(`Method  Not Allowed`)
}
