import { Message } from "../main";

export class DiceMessage extends Message {
  constructor(public master_id: string) {
    super(master_id);
  }
}
