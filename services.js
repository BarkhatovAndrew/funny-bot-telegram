const fetch = require("node-fetch");

const tokenize = async (randomText) => {
  try {
    const response = await fetch(
      "https://api.retext.ai/api/v1/queue_paraphrase",
      {
        credentials: "include",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0",
          Accept: "*/*",
          "Accept-Language": "en-GB,en;q=0.5",
          "Content-type": "application/json",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
        referrer: "https://retext.ai/",
        body: JSON.stringify({ lang: "ru", source: randomText }),
        method: "POST",
        mode: "cors",
      }
    );
    return await response.json();
  } catch (e) {}
};

const gen = async (token) => {
  try {
    const response = await fetch(
      `https://api.retext.ai/api/v1/queue_check?taskId=${token}`,
      {
        credentials: "include",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0",
          Accept: "*/*",
          "Accept-Language": "en-GB,en;q=0.5",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
        referrer: "https://retext.ai/",
        method: "GET",
        mode: "cors",
      }
    );
    return await response.json();
  } catch (e) {}
};

module.exports = { gen, tokenize };
