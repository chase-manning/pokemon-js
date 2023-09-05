export interface MapType {
  name: string;
  image: string;
  height: number;
  width: number;
  walls: Record<number, Record<number, boolean>>;
  text: Record<number, Record<number, string[]>>;
}
