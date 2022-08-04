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
