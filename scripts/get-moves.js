const pokemon = require("./pokemon.json");
const fs = require("fs");

function getPokemonId(name) {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name === name) return i + 1;
  }
  return null;
}

const downloadData = async () => {
  const moves = JSON.parse(fs.readFileSync("moves.json"));

  for (let i = 0; i < moves.length; i++) {
    const output = JSON.parse(fs.readFileSync("data.json"));

    if (output[moves[i].name]) {
      console.log(`Already downloaded ${moves[i].name}`);
      continue;
    }

    const moveId = moves[i].name;
    const response = await fetch(moves[i].url);
    const data = await response.json();

    const learnedBy = [];

    for (let j = 0; j < data.learned_by_pokemon.length; j++) {
      const pokemonId = getPokemonId(data.learned_by_pokemon[j].name);
      if (!pokemonId) continue;
      learnedBy.push(pokemonId);
    }

    const effect = data.effect_entries[0]
      ? data.effect_entries[0].short_effect
      : "";

    const meta = data.meta
      ? {
          ailment: data.meta.ailment.name,
          ailmentChance: data.meta.ailment_chance,
          category: data.meta.category.name,
          critRate: data.meta.crit_rate,
          drain: data.meta.drain,
          flinchChance: data.meta.flinch_chance,
          healing: data.meta.healing,
          maxHits: data.meta.max_hits,
          maxTurns: data.meta.max_turns,
          minHits: data.meta.min_hits,
          minTurns: data.meta.min_turns,
          statChance: data.meta.stat_chance,
        }
      : null;

    const output_ = {
      id: moveId,
      accuracy: data.accuracy,
      damageClass: data.damage_class.name,
      effect,
      effectChance: data.effect_chance,
      learnedBy,
      meta,
      name: data.names.find((name) => name.language.name === "en").name,
      power: data.power,
      pp: data.pp,
      priority: data.priority,
      type: data.type.name,
    };

    output[moveId] = output_;

    console.log(`Downloaded ${output_.name}`);

    fs.writeFileSync("data.json", JSON.stringify(output));

    // wait one second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

downloadData();
