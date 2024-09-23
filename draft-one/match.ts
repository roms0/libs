import { Establisher } from "./establisher";
import { Establishment } from "./establishment";

export class Match {
  establishmentChart: Record<Establishment, number[]>;
  diceChart: Record<number, Establishment[]>;
  establishers: Establisher[];
  turns: number;
  dice: number;
  swap: {
    establishment: Establishment | null;
    establisher: number | null;
  };
}
