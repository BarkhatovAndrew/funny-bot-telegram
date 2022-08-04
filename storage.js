const fetch = require("node-fetch");

const getStorage = async () => {
  const response = await fetch(
    "https://phrasesanekdoty-default-rtdb.europe-west1.firebasedatabase.app/phrases.json"
  );
  const object = await response.json();
  return Object.values(object).map((item) => item.phrase);
};

const setNewPhraseToStorage = async (phrase) => {
  await fetch(
    "https://phrasesanekdoty-default-rtdb.europe-west1.firebasedatabase.app/phrases.json",
    {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ phrase }),
    }
  );
};

module.exports = { getStorage, setNewPhraseToStorage };
