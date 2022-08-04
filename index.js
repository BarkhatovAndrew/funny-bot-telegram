const TelegramApi = require("node-telegram-bot-api");
const { splitter, generator } = require("./helpers");
const { gen, tokenize } = require("./services");
const { getStorage, setNewPhraseToStorage } = require("./storage");

const token = "5496638391:AAEYBt2Q6XixYfnUrWtrHuvjdXKl24PiYNU";

const bot = new TelegramApi(token, { polling: true });
let money = 100;
const game = ["Камень", "Ножницы", "Бумага"];

const url =
  "https://api.retext.ai/api/v1/queue_check?taskId=e7b065c2-32b4-48d8-b32e-1145f0d31f93";

bot.on("message", async (msg) => {
  const { text } = msg;
  const chatId = msg.chat.id;
  let storage;
  try {
    storage = await getStorage();
  } catch (e) {}

  if (text === "/start") {
    await bot.sendMessage(chatId, "здарова");
  } else if (text === "/quote") {
    const randomText = generator(splitter(storage));

    try {
      const token = await tokenize(randomText);
      console.log(token);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const res = await gen(token.data.taskId);

      await bot.sendMessage(chatId, res.data.result[0]);
    } catch (e) {}
  } else {
    try {
      await setNewPhraseToStorage(text);
    } catch (e) {}
  }
});
