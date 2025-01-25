import {
  IncomeInstruction,
  RandomDiceInstruction,
  CornHarvestInstruction,
  IncomeStageInstruction,
  State,
  uid,
  Intention,
  MasterableItem,
  TransferOwnershipInstruction,
} from "./commands-intentions-consumers";

class HarvestCornFieldIntention implements Intention {
  title = "harvest corn field";
  id: string;
  constructor(public field_id: string, public master_id: string) {
    this.id = uid();
  }
  client_slots: {};
  effect(state: State) {
    state.add_instruction(
      new IncomeInstruction(this.master_id, this.field_id, 1)
    );
    state.add_instruction(new CornHarvestInstruction(this.id));
  }
}

export class CornFieldItem implements MasterableItem {
  title = "corn field";
  id: string;
  isProcessed = false;
  isCooldown = true;
  constructor(public master: string) {
    this.title = "corn field";
    this.id = uid();
  }
  intent(state: State) {
    if (!this.isProcessed || this.isCooldown) {
      return;
    }
    state.add_intention(new HarvestCornFieldIntention(this.id, this.master));
  }
  update(state: State) {
    Object.values(state.instructions).forEach((instruction) => {
      if (instruction instanceof RandomDiceInstruction) {
        if (instruction.range === 1) {
          this.isProcessed = true;
        }
      }
      if (instruction instanceof IncomeStageInstruction) {
        this.isCooldown = false;
      }
      if (instruction instanceof CornHarvestInstruction) {
        if (instruction.field === this.id) {
          this.isProcessed = false;
          this.isCooldown = true;
        }
      }
      if (instruction instanceof TransferOwnershipInstruction) {
        if (
          instruction.pre_master_id === this.master &&
          instruction.data_id === this.id
        ) {
          this.master = instruction.master_id;
        }
      }
    });
  }
}

const state = new State();
state.add_instruction(new IncomeStageInstruction());
state.add_instruction(new RandomDiceInstruction(1));
setTimeout(() => {
  state.update_items();
  state.update_intentions();
  console.log(state);
}, 1000);
