import {
  IncomeInstruction,
  RandomDiceInstruction,
  CornHarvestInstruction,
  IncomeStageInstruction,
  Item,
  State,
  uid,
  Intention,
  MasterableItem,
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

class DealIntention implements Intention {
  title = "deal";
  id: string;
  client_slots = {
    ids: [] as string[],
  };
  constructor(state: State, master_id: string) {
    this.id = uid();
    this.client_slots["ids"] = Object.values(state.items)
      .filter((item) => "master" in item)
      .filter((masterable) => masterable.master !== master_id)
      .map((item) => item.id);
  }
  effect(state: State, action: typeof this.client_slots): void {}
}

class CornFieldItem implements MasterableItem {
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
    });
  }
}

const state = new State();
const field1 = new CornFieldItem("1");
const field2 = new CornFieldItem("2");
const field3 = new CornFieldItem("3");
[field1, field2, field3].forEach((field) => {
  state.items[field.id] = field;
});
state.add_intention(new DealIntention(state, "2"));
// state.add_instruction(new IncomeStageInstruction());
// state.add_instruction(new RandomDiceInstruction(1));
console.log(JSON.stringify(state, null, 3));
// setTimeout(() => {
//   state.update_items();
//   state.update_intentions();
//   console.log(state);
// }, 1000);
