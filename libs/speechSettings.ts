// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// Replace with your own subscription key, service region (e.g., "westus"),
// and recognition language.
export const subscriptionKey = 'YourSubscriptionKey'
export const serviceRegion = 'eastasia' // e.g., "westus"
export const language = 'en-US'

// Replace with the full path to a wav file you want to recognize or overwrite.
export let filename = 'YourAudioFile.wav' // 16000 Hz, Mono
export const topic = 'YourTopic'

// Replace with your own Language Understanding subscription key (endpoint
// key), region, and app ID in case you want to run the intent sample.
export const luSubscriptionKey = 'YourLanguageUnderstandingSubscriptionKey'
export const luServiceRegion = 'YourLanguageUnderstandingServiceRegion'
export const luAppId = 'YourLanguageUnderstandingAppId'
export let speechBuffer: Buffer
export let reference_text = '' //如果希望执行无脚本评估就用空字符串。

export function setFilename(newFilename: string) {
  filename = newFilename
}

export function setReference_text(text: string) {
  reference_text = text
}

export function setSpeechBuffter(buffer: Buffer) {
  speechBuffer = buffer
}
