import { calculation } from "./calculation.state";
import { Establisher } from "./establisher";
import { idle } from "./idle.state";
import { Match } from "./match";
import { swap } from "./swap.state";

export enum STATES {
  IDLE,
  CALCULATION,
  SWAP,
}

export const pipe = [idle, calculation, swap];
const last = pipe.length - 1;

export abstract class State {
  abstract title: STATES;
  abstract starts(match: Match, i: number): void;
  abstract do(match: Match, i: number, command: number): void;
}

export function forward(establisher: Establisher) {
  const current = establisher.state.title;
  const sequent = current < last ? current + 1 : 0;
  establisher.state = pipe[sequent];
}
