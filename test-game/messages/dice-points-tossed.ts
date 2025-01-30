import { Message } from "../main";

export class DicePointsTossedMessage extends Message {
  constructor(public points: number, public master_id: string) {
    super(master_id);
  }
}
