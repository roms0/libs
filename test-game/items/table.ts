import { Item, Message, State } from "../main";
import { DicePointsTossedMessage } from "../messages/dice-points-tossed";
import { PassMesage } from "../messages/pass";

export class Table extends Item {
  title: string = "table";
  constructor(public sequence: Record<string, string>) {
    super();
    this.master_id = this.id;
  }
  message(message: Message, state: State): void {
    if (message instanceof DicePointsTossedMessage) {
      state.add(new PassMesage(this.sequence[message.master_id]));
    }
  }
}
