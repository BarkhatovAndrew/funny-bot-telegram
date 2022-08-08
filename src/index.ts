import express from 'express'
import 'dotenv/config'
import TelegramApi from 'node-telegram-bot-api'
import { arraySplitter, randomWordsGenerator } from './helpers.js'
import { generatePhrase, getApiToken, restartServer } from './services.js'
import { getPhrasesFromStorage, setNewPhraseToStorage } from './storage.js'

const app = express()
app.listen(process.env.PORT || 5500)

const token = process.env.TELEGRAM_TOKEN!
const herokuToken = process.env.HEROKU_TOKEN!

const bot = new TelegramApi(token, { polling: true })

bot.on('message', async (msg) => {
  const { text } = msg
  const chatId = msg.chat.id
  let storage: any
  try {
    storage = await getPhrasesFromStorage()
  } catch (e) {
    console.warn((e as Error).message)
  }

  if (text === '/restart') {
    await restartServer(herokuToken)
    return await bot.sendMessage(chatId, 'Перезагружаюсь...')
  } else if (text === '/quote' || text === '/q') {
    const randomText = randomWordsGenerator(arraySplitter(storage))

    try {
      const token = await getApiToken(randomText)
      console.log(token.status)
      if (token.status === 'limit_exceeded') {
        await restartServer(herokuToken)
        return await bot.sendMessage(chatId, 'Лимит сообщений')
      }
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const res = await generatePhrase(token.data.taskId)
      await bot.sendMessage(chatId, res.data.result[0])
    } catch (e) {
      console.warn((e as Error).message)
    }
  } else {
    try {
      await setNewPhraseToStorage(text!)
    } catch (e) {
      console.warn((e as Error).message)
    }
  }
})
