import { Establisher } from "./establisher";

export abstract class State {
  abstract title: string;
  abstract starts(establisher: Establisher): void;
  abstract do(establisher: Establisher): void;
}
