import { Item, Message } from "../main";
import { DicePointsTossedMessage } from "../messages/dice-points-tossed";

export class Tosser extends Item {
  title: string = "tosser";
  tossed: number[] = [];
  constructor() {
    super();
    this.master_id = this.id;
  }
  message(message: Message): void {
    if (message instanceof DicePointsTossedMessage) {
      if (message.master_id === this.id) {
        this.tossed.push(message.points);
      }
    }
  }
}
