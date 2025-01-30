import { uid } from "../../command-intentions-consumers/commands-intentions-consumers";
import { Item, Message, State } from "../main";
import { DiceMessage } from "../messages/dice";
import { DicePointsTossedMessage } from "../messages/dice-points-tossed";

export class Dice extends Item {
  title = "dice";
  points: number = 0;
  constructor() {
    super();
    this.master_id = this.id;
  }
  message(message: Message, state: State): void {
    if (message instanceof DiceMessage) {
      this.points = 10;
      state.add(new DicePointsTossedMessage(this.points, message.master_id));
    }
  }
}
