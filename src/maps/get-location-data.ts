import locationData from "./location-data.json";

const getEncounterData = (location: string) => {
  return (locationData as any)[location].encounters;
};

export default getEncounterData;
