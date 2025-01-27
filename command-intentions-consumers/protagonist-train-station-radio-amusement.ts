import {
  Instruction,
  Intention,
  MasterableItem,
  State,
} from "./commands-intentions-consumers";

abstract class ProtagonistState {
  master_id: string;
  abstract intent(): void;
  abstract update(
    instruction: Instruction,
    item: Protagonist,
    state: State
  ): void;
}

class BuildState implements ProtagonistState {
  constructor(public master_id) {}
  intent(): void {}
  update(instruction: Instruction, item: Protagonist, state: State): void {
    if (instruction instanceof ProtagonistStateInstruction) {
      const state = instruction.state;
      if (state instanceof BuildState) {
        item.transfer;
      }
    }
  }
}

abstract class Transfer {
  abstract transfer(
    instruction: Instruction,
    item: Protagonist,
    state: State
  ): void;
}

class TransferProtagonist {
  transfer(instruction: Instruction, item: Protagonist, state: State) {
    state.add_instruction(
      new TransferProtagonistInstruction(item.following_id)
    );
  }
}

class TransferGreedProtagonist {
  transfer(instruction: Instruction, item: Protagonist, state: State) {
    state.add_instruction(
      new TransferProtagonistInstruction(item.state.master_id)
    );
  }
}

class TransferProtagonistInstruction extends Instruction {
  constructor(public to_id: string) {
    super();
  }
}

class Protagonist implements Item<ProtagonistState> {
  following_id: string;
  transfer: Transfer;
  state: ProtagonistState;
  intentions: {
    off: ["off state"];
    on: ["refresh message", "on state"];
    rolled: ["rolled state"];
    calculated: ["calculated state"];
    build: ["build statea"];
  };
}

class ProtagonistRefreshInstruction extends Instruction {
  constructor(public protagonist_id: string) {
    super();
  }
}

class ProtagonistStateInstruction extends Instruction {
  constructor(public protagonist_id: string, public state: ProtagonistState) {
    super();
  }
}

class PointsInstruction extends Instruction {
  constructor(public protagonist_id: string, public rolls: number) {
    super();
  }
}

abstract class StationTrainCardItemState {
  master_id: string;
  intent(state: State): void {
    throw new Error("Method not implemented.");
  }
  update(instruction: Instruction, item: StationTrainCardItem): void {
    throw new Error("Method not implemented.");
  }
}

class PointsIntention implements Intention {
  id: string;
  title = "points";
  client_slots: Record<string, unknown>;
  constructor(public master_id: string, public points_rolls: number) {}
  effect(state: State, action: unknown): void {
    state.add_instruction(
      new PointsInstruction(this.master_id, this.points_rolls)
    );
  }
}

class CooldownState implements StationTrainCardItemState {
  constructor(public master_id: string) {}
  intent(): void {}
  update(instruction: Instruction, item: StationTrainCardItem): void {
    if (instruction instanceof ProtagonistRefreshInstruction) {
      const refresh_actor_id = instruction.protagonist_id;
      if (item.state.master_id === refresh_actor_id) {
        item.state = new ChargedState(item.state.master_id);
      }
    }
  }
}

class ChargedState implements StationTrainCardItemState {
  constructor(public master_id: string) {}
  intent(state: State): void {
    state.add_intention(new PointsIntention(this.master_id, 2));
  }
  update(instruction: Instruction, item: StationTrainCardItem): void {
    if (instruction instanceof ProtagonistStateInstruction) {
      if (instruction.protagonist_id === item.state.master_id) {
        item.state = new CooldownState(item.state.master_id);
      }
    }
    if (instruction instanceof PointsInstruction) {
      if (
        item.state.master_id === instruction.protagonist_id &&
        instruction.rolls === 2
      ) {
        item.state = new CooldownState(item.state.master_id);
      }
    }
  }
}

abstract class Item<T> {
  state: T;
}

interface Masterable {
  master_id: string;
}

class StationTrainCardItem implements Item<Masterable> {
  state: StationTrainCardItemState;
  constructor(master_id: string) {
    this.state = new CooldownState(master_id);
  }
}

// по поводу карусели: карусель должна слушать PointsInstruction и в определенное
// условие кидать ItemEffectInstruction который заслушает Protagonist
// он его заслушает и сменит стратегию OffState - вместо передачи master_id он оставит его
