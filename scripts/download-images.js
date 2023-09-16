const fs = require("fs");
const fetch = require("node-fetch");

const pokemon = JSON.parse(fs.readFileSync("data.json"));

const downloadData = async () => {
  for (let i = 1; i < 152; i++) {
    const poke = pokemon[i];
    const front = poke.images.front;
    const back = poke.images.back;
    const frontResponse = await fetch(front);
    const backResponse = await fetch(back);
    const frontBuffer = await frontResponse.buffer();
    const backBuffer = await backResponse.buffer();
    fs.writeFileSync(`./images/front/${i}.png`, frontBuffer);
    fs.writeFileSync(`./images/back/${i}.png`, backBuffer);
    console.log(`Downloaded ${poke.name}`);
  }
};

downloadData();
