import gateHouse from "./gate-house";
import houseA1f from "./house-a-1f";
import houseA2f from "./house-a-2f";
import houseB from "./house-b";
import lab from "./lab";
import { MapId, MapType } from "./map-types";
import palletTown from "./pallet-town";
import route1 from "./route-1";
import route2 from "./route-2";
import route2Gate from "./route-2-gate";
import route22 from "./route-22";
import viridianForrest from "./viridian-forrest";
import viridianCity from "./viridian-city";
import viridianCityAcadamy from "./viridian-city-acadamy";
import viridianCityGym from "./viridian-city-gym";
import viridianCityNpcHouse from "./viridian-city-npc-house";
import viridianCityPokeMart from "./viridian-city-poke-mart";
import viridianCityPokemonCenter from "./viridian-city-pokemon-center";
import pewterCity from "./pewter-city";
import route2GateNorth from "./route-2-gate-north";
import pewterCityPokeMart from "./pewter-city-poke-mart";
import pewterCityPokemonCenter from "./pewter-city-pokemon-center";
import peweterCityNpcA from "./pewter-city-npc-a";
import peweterCityNpcB from "./pewter-city-npc-b";
import pewterCityGym from "./pewter-city-gym";
import pewterMuseum1f from "./pewter-museum-1f";
import pewterMuseum2f from "./pewter-museum-2f";
import route3 from "./route-3";
import route3PokemonCenter from "./route-3-pokemon-center";
import mtMoon1f from "./mt-moon-1f";
import mtMoon2f from "./mt-moon-2f";
import mtMoon3f from "./mt-moon-3f";

const mapData: Record<string, MapType> = {
  [MapId.PalletTown]: palletTown,
  [MapId.PalletTownHouseA1F]: houseA1f,
  [MapId.PalletTownHouseA2F]: houseA2f,
  [MapId.PalletTownHouseB]: houseB,
  [MapId.PalletTownLab]: lab,
  [MapId.Route1]: route1,
  [MapId.ViridianCity]: viridianCity,
  [MapId.ViridianCityPokemonCenter]: viridianCityPokemonCenter,
  [MapId.ViridianCityPokeMart]: viridianCityPokeMart,
  [MapId.ViridianCityPokemonAcadamy]: viridianCityAcadamy,
  [MapId.ViridianCityNpcHouse]: viridianCityNpcHouse,
  [MapId.ViridianCityGym]: viridianCityGym,
  [MapId.Route22]: route22,
  [MapId.GateHouse]: gateHouse,
  [MapId.Route2]: route2,
  [MapId.Route2Gate]: route2Gate,
  [MapId.ViridianForrest]: viridianForrest,
  [MapId.PewterCity]: pewterCity,
  [MapId.Route2GateNorth]: route2GateNorth,
  [MapId.PewterCityPokeMart]: pewterCityPokeMart,
  [MapId.PewterCityPokemonCenter]: pewterCityPokemonCenter,
  [MapId.PewterCityNpcA]: peweterCityNpcA,
  [MapId.PewterCityNpcB]: peweterCityNpcB,
  [MapId.PewterCityGym]: pewterCityGym,
  [MapId.PewterCityMuseum1f]: pewterMuseum1f,
  [MapId.PewterCityMuseum2f]: pewterMuseum2f,
  [MapId.Route3]: route3,
  [MapId.Route3PokemonCenter]: route3PokemonCenter,
  [MapId.MtMoon1f]: mtMoon1f,
  [MapId.MtMoon2f]: mtMoon2f,
  [MapId.MtMoon3f]: mtMoon3f,
};

export default mapData;
