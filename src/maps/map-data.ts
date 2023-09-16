import houseA1f from "./house-a-1f";
import houseA2f from "./house-a-2f";
import houseB from "./house-b";
import lab from "./lab";
import { MapId, MapType } from "./map-types";
import palletTown from "./pallet-town";

const mapData: Record<string, MapType> = {
  [MapId.PalletTown]: palletTown,
  [MapId.PalletTownHouseA1F]: houseA1f,
  [MapId.PalletTownHouseA2F]: houseA2f,
  [MapId.PalletTownHouseB]: houseB,
  [MapId.PalletTownLab]: lab,
};

export default mapData;
