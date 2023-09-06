export interface MapType {
  name: string;
  image: string;
  height: number;
  width: number;
  start: { x: number; y: number };
  walls: Record<number, Record<number, boolean>>;
  text: Record<number, Record<number, string[]>>;
  maps: Record<number, Record<number, MapType>>;
}
