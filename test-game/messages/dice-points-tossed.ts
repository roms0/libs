import { Message } from "../main";

export class DicePointsTossedMessage extends Message {
  title = "points tossed";
  constructor(public points: number, public master_id: string) {
    super(master_id);
  }
}
