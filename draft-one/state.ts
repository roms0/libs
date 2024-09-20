import { calculation } from "./calculation.state";
import { Establisher } from "./establisher";
import { idle } from "./idle.state";
import { Match } from "./match";

export enum STATES {
  IDLE,
  CALCULATION,
}

export const pipe = [idle, calculation];
const last = pipe.length - 1;

export abstract class State {
  abstract title: STATES;
  abstract starts(match: Match, i: number): void;
  abstract do(match: Match, i: number): void;
}

export function forward(establisher: Establisher) {
  const current = establisher.state.title;
  const sequent = current < last ? current + 1 : 0;
  establisher.state = pipe[sequent];
}
