const pokemon = require("./pokemon.json");
const fs = require("fs");

const downloadData = async () => {
  let output = {};

  for (let i = 0; i < pokemon.length; i++) {
    const response = await fetch(pokemon[i].url);
    const data = await response.json();

    const moves = [];

    for (let j = 0; j < data.moves.length; j++) {
      const name = data.moves[j].move.name;
      const versionDetails = data.moves[j].version_group_details.find(
        (move) =>
          move.move_learn_method.name === "level-up" &&
          move.version_group.name === "red-blue"
      );
      if (versionDetails) {
        moves.push({
          name,
          levelLearnedAt: versionDetails.level_learned_at,
        });
      }
    }

    const poke = {
      baseExperience: data.base_experience,
      height: data.height,
      id: data.id,
      moves,
      name: data.name,
      images: {
        front:
          data.sprites.versions["generation-i"]["red-blue"].front_transparent,
        back: data.sprites.versions["generation-i"]["red-blue"]
          .back_transparent,
      },
      baseStats: {
        hp: data.stats.filter((stat) => stat.stat.name === "hp")[0].base_stat,
        attack: data.stats.filter((stat) => stat.stat.name === "attack")[0]
          .base_stat,
        defense: data.stats.filter((stat) => stat.stat.name === "defense")[0]
          .base_stat,
        specialAttack: data.stats.filter(
          (stat) => stat.stat.name === "special-attack"
        )[0].base_stat,
        specialDefense: data.stats.filter(
          (stat) => stat.stat.name === "special-defense"
        )[0].base_stat,
        speed: data.stats.filter((stat) => stat.stat.name === "speed")[0]
          .base_stat,
      },
      types: data.types.map((type) => type.type.name),
    };

    output[i] = poke;

    console.log(`Downloaded ${poke.name}`);
    // wait one second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  fs.writeFileSync("data.json", JSON.stringify(output));
};

downloadData();
