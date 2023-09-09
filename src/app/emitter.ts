import mitt from "mitt";

export enum Event {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
  A = "a",
  B = "b",
  Start = "start",
  Select = "select",
}

const emitter = mitt();

export default emitter;
