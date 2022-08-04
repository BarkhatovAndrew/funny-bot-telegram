const splitter = (array) => {
  const resultArray = [];
  array.map((item) =>
    item.split(" ").forEach((el) => el.length > 2 && resultArray.push(el))
  );
  return resultArray;
};

const generator = (array) => {
  const result = [];
  const randomTextLength = Math.ceil(Math.random() * (15 - 5) + 5);

  for (let i = 0; i < randomTextLength; i++) {
    const randomNumber = Math.ceil(Math.random() * array.length);
    result.push(array[randomNumber]);
  }
  return result.join(" ");
};

module.exports = { splitter, generator };
