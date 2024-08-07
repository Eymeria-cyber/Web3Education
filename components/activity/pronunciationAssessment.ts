// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// pull in the required packages.
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import _ from 'lodash'
import * as speechSettings from '../../libs/speechSettings'

// pronunciation assessment with audio file
export const main = async (settings: typeof speechSettings) => {
  return new Promise<sdk.PronunciationAssessmentResult>((resolve, reject) => {
    var audioConfig = sdk.AudioConfig.fromWavFileInput(settings.speechBuffer)
    var speechConfig = sdk.SpeechConfig.fromSubscription(
      settings.subscriptionKey,
      settings.serviceRegion
    )
    console.log(audioConfig)
    // var reference_text = "What's the weather like?"
    // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
      settings.reference_text,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    )
    pronunciationAssessmentConfig.enableProsodyAssessment = true
    // 设置初始静默超时时间（单位：毫秒）
    const recognitionSilenceTimeout = 10000 // 10秒
    speechConfig.setProperty(
      sdk.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs,
      recognitionSilenceTimeout.toString()
    )
    // setting the recognition language to English.
    speechConfig.speechRecognitionLanguage = settings.language
    // create the speech recognizer.
    var reco = new sdk.SpeechRecognizer(speechConfig, audioConfig)
    pronunciationAssessmentConfig.applyTo(reco)

    function onRecognizedResult(result: any) {
      console.log(result)

      console.log('pronunciation assessment for: ', result.text)
      var pronunciation_result =
        sdk.PronunciationAssessmentResult.fromResult(result)
      console.log(
        ' Accuracy score: ',
        pronunciation_result.accuracyScore,
        '\n',
        'pronunciation score: ',
        pronunciation_result.pronunciationScore,
        '\n',
        'completeness score : ',
        pronunciation_result.completenessScore,
        '\n',
        'fluency score: ',
        pronunciation_result.fluencyScore,
        '\n',
        'prosody score: ',
        pronunciation_result.prosodyScore
      )
      console.log('  Word-level details:')
      _.forEach(pronunciation_result.detailResult.Words, (word, idx) => {
        console.log(
          '    ',
          idx + 1,
          ': word: ',
          word.Word,
          '\taccuracy score: ',
          word.PronunciationAssessment?.AccuracyScore,
          '\terror type: ',
          word.PronunciationAssessment?.ErrorType,
          ';'
        )
      })
      resolve(pronunciation_result)
      reco.close()
    }

    reco.recognizeOnceAsync((successfulResult) => {
      console.log('开始执行回调')
      onRecognizedResult(successfulResult)
    })
    reco.recognized
  })
}
