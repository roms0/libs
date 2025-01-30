import { DiceHandler } from "../handlers/dice-handler";
import { Item, Message, State } from "../main";
import { PassMesage } from "../messages/pass";

export class Turn extends Item {
  title: string = "turn";
  constructor(public master_id: string) {
    super();
  }
  message(message: Message, state: State, reciever: Item): void {
    if (message instanceof PassMesage) {
      delete state.items[this.id];
      state.add(new Turn(message.master_id));
    }
  }
  intentions(state: State): void {
    state.add(new DiceHandler(this.master_id));
  }
}
