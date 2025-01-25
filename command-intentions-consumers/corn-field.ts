import {
  IncomeInstruction,
  RandomDiceInstruction,
  CornHarvestInstruction,
  IncomeStageInstruction,
  Item,
  State,
  uid,
  Instruction,
} from "./commands-intentions-consumers";

class HarvestCornFieldIntention {
  title = "harvest corn field";
  id: string;
  required = null;
  constructor(public field_id, public master_id) {
    this.id = uid();
  }
  effect(state: State) {
    state.add_instruction(
      new IncomeInstruction(this.master_id, this.field_id, 1)
    );
    state.add_instruction(new CornHarvestInstruction(this.id));
  }
}

class CornFieldItem extends Item {
  title: string;
  isProcessed = false;
  isCooldown = true;
  constructor(public master: string) {
    super();
    this.title = "corn field";
  }
  read(state: State) {
    if (!this.isProcessed || this.isCooldown) {
      return;
    }
    state.add_intention(new HarvestCornFieldIntention(this.id, this.master));
  }
  react(instructions: Record<string, Instruction>) {
    Object.values(instructions).forEach((instruction) => {
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
const field = new CornFieldItem("1");
state.items[field.id] = field;
state.read();
console.log(state);
const start_incomes = new IncomeStageInstruction();
const dice = new RandomDiceInstruction(1);
state.instructions[start_incomes.id] = start_incomes;
state.instructions[dice.id] = dice;
state.react();
state.read();
console.log(state);
