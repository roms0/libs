import { Accountable } from "./accountable";

type State = {
  turn: number;
  queue: string[];
  prom_length: number;
  prom_pos: number;
  get_main: (items: Record<string, unknown>) => Accountable;
  points: number[];
  get_match: (points: number) => boolean;
};

export { State };
