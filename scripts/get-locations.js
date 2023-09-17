const pokemon = require("./pokemon.json");
const fs = require("fs");

function getPokemonId(name) {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name === name) return i + 1;
  }
  return null;
}

const getEncounterRate = (encounterMethodRates, methodName) => {
  const rate = encounterMethodRates.find(
    (method) => method.encounter_method.name === methodName
  );
  if (!rate) return 0;
  const red = rate.version_details.find(
    (detail) => detail.version.name === "firered"
  );
  return red ? red.rate : 0;
};

const getPokemon = (pokemonEncounters, methodName) => {
  const pokemon = [];

  for (let i = 0; i < pokemonEncounters.length; i++) {
    const pokemonName = pokemonEncounters[i].pokemon.name;
    const pokemonId = getPokemonId(pokemonName);
    if (!pokemonId) continue;
    const blueData = pokemonEncounters[i].version_details.find(
      (detail) => detail.version.name === "blue"
    );
    if (!blueData) continue;
    for (let j = 0; j < blueData.encounter_details.length; j++) {
      const details = blueData.encounter_details[j];
      const method = details.method.name;
      if (method === methodName) {
        const pokemon_ = {
          id: pokemonId,
          chance: details.chance,
          conditionValues: details.condition_values,
          maxLevel: details.max_level,
          minLevel: details.min_level,
        };
        pokemon.push(pokemon_);
      }
    }
  }

  return pokemon;
};

const downloadData = async () => {
  const locations = JSON.parse(fs.readFileSync("location-areas.json"));
  // const locations = [
  //   {
  //     name: "kanto-route-1-area",
  //     url: "https://pokeapi.co/api/v2/location-area/295/",
  //   },
  // ];

  let output = {};

  for (let i = 0; i < locations.length; i++) {
    const response = await fetch(locations[i].url);
    const data = await response.json();

    const rates = data.encounter_method_rates;
    const pokemonEncounters = data.pokemon_encounters;

    const location = {
      id: data.name,
      name: data.names.filter((name) => name.language.name === "en")[0].name,
      encounters: {
        walk: {
          rate: getEncounterRate(rates, "walk"),
          pokemon: getPokemon(pokemonEncounters, "walk"),
        },
        oldRod: {
          rate: getEncounterRate(rates, "old-rod"),
          pokemon: getPokemon(pokemonEncounters, "old-rod"),
        },
        goodRod: {
          rate: getEncounterRate(rates, "good-rod"),
          pokemon: getPokemon(pokemonEncounters, "good-rod"),
        },
        superRod: {
          rate: getEncounterRate(rates, "super-rod"),
          pokemon: getPokemon(pokemonEncounters, "super-rod"),
        },
        surf: {
          rate: getEncounterRate(rates, "surf"),
          pokemon: getPokemon(pokemonEncounters, "surf"),
        },
        rockSmash: {
          rate: getEncounterRate(rates, "rock-smash"),
          pokemon: getPokemon(pokemonEncounters, "rock-smash"),
        },
        headbutt: {
          rate: getEncounterRate(rates, "headbutt"),
          pokemon: getPokemon(pokemonEncounters, "headbutt"),
        },
        darkGrass: {
          rate: getEncounterRate(rates, "dark-grass"),
          pokemon: getPokemon(pokemonEncounters, "dark-grass"),
        },
        grassSpots: {
          rate: getEncounterRate(rates, "grass-spots"),
          pokemon: getPokemon(pokemonEncounters, "grass-spots"),
        },
        caveSpots: {
          rate: getEncounterRate(rates, "cave-spots"),
          pokemon: getPokemon(pokemonEncounters, "cave-spots"),
        },
        bridgeSpots: {
          rate: getEncounterRate(rates, "bridge-spots"),
          pokemon: getPokemon(pokemonEncounters, "bridge-spots"),
        },
        superRodSpots: {
          rate: getEncounterRate(rates, "super-rod-spots"),
          pokemon: getPokemon(pokemonEncounters, "super-rod-spots"),
        },
        surfSpots: {
          rate: getEncounterRate(rates, "surf-spots"),
          pokemon: getPokemon(pokemonEncounters, "surf-spots"),
        },
        yellowFlowers: {
          rate: getEncounterRate(rates, "yellow-flowers"),
          pokemon: getPokemon(pokemonEncounters, "yellow-flowers"),
        },
        purpleFlowers: {
          rate: getEncounterRate(rates, "purple-flowers"),
          pokemon: getPokemon(pokemonEncounters, "purple-flowers"),
        },
        redFlowers: {
          rate: getEncounterRate(rates, "red-flowers"),
          pokemon: getPokemon(pokemonEncounters, "red-flowers"),
        },
        roughTerrain: {
          rate: getEncounterRate(rates, "rough-terrain"),
          pokemon: getPokemon(pokemonEncounters, "rough-terrain"),
        },
        gift: {
          rate: getEncounterRate(rates, "gift"),
          pokemon: getPokemon(pokemonEncounters, "gift"),
        },
        giftEgg: {
          rate: getEncounterRate(rates, "gift-egg"),
          pokemon: getPokemon(pokemonEncounters, "gift-egg"),
        },
        onlyOne: {
          rate: getEncounterRate(rates, "only-one"),
          pokemon: getPokemon(pokemonEncounters, "only-one"),
        },
      },
    };

    output[data.name] = location;

    console.log(`Downloaded ${location.name}`);

    // wait one second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  fs.writeFileSync("data.json", JSON.stringify(output));
};

downloadData();
