const pokemon = require("./pokemon.json");
const fs = require("fs");

const BASE_URL = "https://pokeapi.co/api/v2/evolution-chain/";

function getPokemonId(name) {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name === name) return i + 1;
  }
  return null;
}

const downloadData = async () => {
  // Read data
  const output = JSON.parse(fs.readFileSync("data.json"));

  for (let i = 1; i < 150; i++) {
    console.log("Downloading", i);
    const response = await fetch(`${BASE_URL}${i}`);
    const data = await response.json();
    const pokemonName = data.chain.species.name;
    console.log(pokemonName);

    const evolvesTo = data.chain.evolves_to.find(
      (e) => e.evolution_details[0].trigger.name === "level-up"
    );
    if (!evolvesTo) continue;
    const evolution = {
      pokemon: getPokemonId(evolvesTo.species.name),
      level: evolvesTo.evolution_details[0].min_level,
    };
    const pokemonId = getPokemonId(pokemonName);
    if (pokemonId && evolution.pokemon) {
      output[pokemonId].evolution = evolution;
    }
    const evolvesTo2 = evolvesTo.evolves_to.find(
      (e) => e.evolution_details[0].trigger.name === "level-up"
    );
    console.log(evolvesTo2);
    if (!evolvesTo2) continue;
    console.log(evolvesTo2);
    const evolution2 = {
      pokemon: getPokemonId(evolvesTo2.species.name),
      level: evolvesTo2.evolution_details[0].min_level,
    };
    console.log(evolution2);

    if (evolution.pokemon && evolution2.pokemon) {
      output[evolution.pokemon].evolution = evolution2;
    }

    console.log(`Downloaded ${i}`);
    // wait one second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  fs.writeFileSync("data.json", JSON.stringify(output));
};

downloadData();
