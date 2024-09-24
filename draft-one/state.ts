import { calculation } from "./calculation.state";
import { dice } from "./dice.state";
import { Establisher } from "./establisher";
import { idle } from "./idle.state";
import { Match } from "./match";
import { swap } from "./swap.state";

export enum STATES {
  IDLE,
  DICEPICK,
  DICE,
  RETOSS,
  CALCULATION,
  SWAP,
  REPEAT,
}

export const pipe = [idle, dice, calculation, swap];
const last = pipe.length - 1;

export abstract class State {
  abstract title: STATES;
  abstract starts(match: Match, i: number): void;
  //todo command is to have unknown type - one for a state
  abstract do(match: Match, i: number, command: number): void;
}

export function forward(establisher: Establisher) {
  const current = establisher.state.title;
  const sequent = current < last ? current + 1 : 0;
  establisher.state = pipe[sequent];
}

export function repipe(establisher: Establisher) {
  establisher.state = pipe[1];
}
