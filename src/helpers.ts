import { generatePhrase, getApiToken, restartServer } from './services.js'
import TelegramApi from 'node-telegram-bot-api'

export const arraySplitter = (array: string[]) => {
  const resultArray: string[] = []
  array.map((item) => item.split(' ').forEach((el) => el.length > 2 && resultArray.push(el)))
  return resultArray
}

export const randomWordsGenerator = (array: string[]) => {
  const result = []
  const randomTextLength = Math.ceil(Math.random() * 10 + 5)

  for (let i = 0; i < randomTextLength; i++) {
    const randomNumber = Math.ceil(Math.random() * array.length)
    result.push(array[randomNumber])
  }
  return result.join(' ')
}

export const sendMsg = async (
  storage: string[],
  herokuToken: string,
  chatId: number,
  bot: TelegramApi,
  randomText: string
) => {
  try {
    const token = await getApiToken(randomText)
    console.log(token.status)
    if (token.status === 'limit_exceeded') {
      await restartServer(herokuToken)
      return await bot.sendMessage(chatId, 'Достигнут лимит сообщений. Подождите немного.')
    }
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const res = await generatePhrase(token.data.taskId)
    await bot.sendMessage(chatId, res.data.result[4])
  } catch (e) {
    console.warn((e as Error).message)
  }
}
