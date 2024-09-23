import { forward, pipe, State, STATES } from "./state";

export const dice: State = {
  title: STATES.DICE,
  starts() {},
  do(match, i) {
    match.dice = single_dice().reduce((pre, c) => (pre += c), 0);
    forward(match.establishers[i]);
    match.establishers[i].state.starts(match, i);
  },
};

function assigner(i: Uint8Array) {
  self.crypto.getRandomValues(i);
  return i.map((n) => Math.trunc(n / 44) + 1);
}

function roll_dice_count(k: number): number[] {
  const array = new Uint8Array(k);
  return assigner(array) as unknown as number[];
}

export const single_dice = () => roll_dice_count(1);
export const double_dice = () => roll_dice_count(2);
