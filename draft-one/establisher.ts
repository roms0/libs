import { Establishment } from "./establishment";
import { State } from "./state";

export class Establisher {
  establishmentChart: Record<Establishment, number>;
  id: string;
  state: State;
  balance: number;
  data?: any;
  enroll(s: number) {
    this.balance += s;
  }
  hand(s: number) {
    if (this.balance === 0) return 0;
    if (this.balance <= s) {
      const m = this.balance;
      this.balance = 0;
      return m;
    }
    this.balance - s;
    return s;
  }
  has(e: Establishment) {
    return this.establishmentChart[e] > 0;
  }
}
