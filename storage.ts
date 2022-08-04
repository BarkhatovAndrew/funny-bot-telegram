import fetch from 'node-fetch'

export const getPhrasesFromStorage = async () => {
  try {
    const response = await fetch(process.env.BD_URL!)
    const responseObject = await response.json()
    return Object.values(responseObject).map((item: any) => item.phrase)
  } catch (e) {
    console.warn((e as Error).message)
  }
}

export const setNewPhraseToStorage = async (phrase: string) => {
  try {
    await fetch(process.env.BD_URL!, {
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
