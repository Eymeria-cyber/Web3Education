// TODO
// 缺少 entity id？

export const MockCourse = {
    "title": "Advanced Chinese Listening Course",
    "description": "This course aims to enhance your" ,
    "segments": [
      {
        "title": "Introduction to the Course",
        "chineseSubtitle": "课程介绍",
        "englishSubtitle": "Introduction to the Course",
        "audioUrl": "/audio/course1/intro.mp3"
      },
      {
        "title": "Lesson 1: Daily Conversations",
        "chineseSubtitle": "第一课：日常对话",
        "englishSubtitle": "Lesson 1: Daily Conversations",
        "audioUrl": "/audio/course1/lesson1.mp3"
      },
      {
        "title": "Lesson 2: Travel in China",
        "chineseSubtitle": "第二课：中国旅行",
        "englishSubtitle": "Lesson 2: Travel in China",
        "audioUrl": "/audio/course1/lesson2.mp3"
      },
      {
        "title": "Lesson 3: Chinese Cuisine",
        "chineseSubtitle": "第三课：中国美食",
        "englishSubtitle": "Lesson 3: Chinese Cuisine",
        "audioUrl": "/audio/course1/lesson3.mp3"
      },
      {
        "title": "Lesson 4: Business Chinese",
        "chineseSubtitle": "第四课：商务中文",
        "englishSubtitle": "Lesson 4: Business Chinese",
        "audioUrl": "/audio/course1/lesson4.mp3"
      }
    ]
  }

  export const MockCourseList = Array.from({length: 10}).map(() => MockCourse)