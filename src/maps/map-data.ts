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
};

export default mapData;
