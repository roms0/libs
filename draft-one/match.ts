import { Establisher } from "./establisher";
import { Establishment } from "./establishment";

export class Match {
  establishmentChart: Record<Establishment, number[]>;
  establishers: Establisher[];
  turns: number;
  dice: number;
}
