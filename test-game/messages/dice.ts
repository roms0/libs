import { Message } from "../main";

export class DiceMessage extends Message {
  title = "dice";
  constructor(public master_id: string) {
    super(master_id);
  }
}
