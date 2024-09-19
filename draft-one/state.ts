import { Establisher } from "./establisher";
import { Match } from "./match";

export abstract class State {
  abstract title: string;
  abstract starts(match: Match, i: number): void;
  abstract do(match: Match, i: number): void;
}
