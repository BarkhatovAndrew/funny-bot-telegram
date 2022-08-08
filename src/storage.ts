import fetch from 'node-fetch'
import { chats } from './chats.js'

export const getPhrasesFromStorage = async (chatId: number) => {
  const url = chats.find((chat) => chat.chatId === chatId)!.title
  try {
    const response = await fetch(process.env.BD_URL! + url + '.json')
    const responseObject = await response.json()
    return Object.values(responseObject).map((item: any) => item.phrase)
  } catch (e) {
    console.warn((e as Error).message)
  }
}

export const setNewPhraseToStorage = async (phrase: string, chatId: number) => {
  const url = chats.find((chat) => chat.chatId === chatId)!.title
  try {
    await fetch(process.env.BD_URL! + url + '.json', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ phrase })
    })
  } catch (e) {
    console.warn((e as Error).message)
  }
}
