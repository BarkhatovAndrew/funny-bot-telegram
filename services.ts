import fetch from 'node-fetch'

export const getApiToken = async (randomText: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/queue_paraphrase`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ lang: 'ru', source: randomText })
    })
    return await response.json()
  } catch (e) {
    console.warn((e as Error).message)
  }
}

export const generatePhrase = async (token: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/queue_check?taskId=${token}`)
    return await response.json()
  } catch (e) {
    console.warn((e as Error).message)
  }
}

export const restartServer = async (herokuToken: string) => {
  try {
    await fetch(process.env.HEROKU_URL!, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.heroku+json; version=3',
        Authorization: 'Bearer ' + herokuToken
      }
    })
  } catch (e) {
    console.warn((e as Error).message)
  }
}
