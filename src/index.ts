import express from 'express'
import 'dotenv/config'
import TelegramApi from 'node-telegram-bot-api'
import { arraySplitter, randomWordsGenerator, sendMsg } from './helpers.js'
import { restartServer } from './services.js'
import { getPhrasesFromStorage, setNewPhraseToStorage } from './storage.js'
import { commands } from './commands.js'

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
    storage = await getPhrasesFromStorage(chatId)
  } catch (e) {
    console.warn((e as Error).message)
  }

  switch (text) {
    case commands.restart:
      await restartServer(herokuToken)
      return await bot.sendMessage(chatId, 'Перезагружаюсь...')
    case commands.quote[0]:
    case commands.quote[1]:
      const randomText = randomWordsGenerator(arraySplitter(storage))
      await sendMsg(storage, herokuToken, chatId, bot, randomText)
      break
    default:
      if (text?.startsWith(`${commands.quote[0]} `) || text?.startsWith(`${commands.quote[1]} `)) {
        const randomText = randomWordsGenerator(arraySplitter(storage))
        const words = text?.split(' ').slice(1).join(' ')
        const reply = (randomText + ' ' + words)
          .split(' ')
          .sort(() => Math.random() - 0.5)
          .join(' ')
        await sendMsg(storage, herokuToken, chatId, bot, reply)
      } else {
        try {
          await setNewPhraseToStorage(text!, chatId)
        } catch (e) {
          console.warn((e as Error).message)
        }
      }
  }
})
