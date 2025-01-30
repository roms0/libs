import { Handler, Message, Payload } from "../main";
import { DiceMessage } from "../messages/dice";

export class DiceHandler extends Handler {
  title = "dice handler";
  handle(): Message[] {
    return [new DiceMessage(this.master_id)];
  }
}
