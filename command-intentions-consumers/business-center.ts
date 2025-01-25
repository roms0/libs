import {
  Intention,
  MasterableItem,
  State,
  TransferOwnershipInstruction,
  uid,
} from "./commands-intentions-consumers";
import { CornFieldItem } from "./corn-field";

class BusinessCenterDealIntention implements Intention {
  title = "business center swap";
  id: string;
  client_slots = {
    in_id: [] as string[],
    out_id: [] as string[],
  };
  constructor(state: State, public master_id: string) {
    this.id = uid();
    this.client_slots["in"] = Object.values(state.items)
      .filter((item) => "master" in item)
      .filter((masterable) => masterable.master !== master_id)
      .map((item) => item.id);
    this.client_slots["out"] = Object.values(state.items)
      .filter((item) => "master" in item)
      .filter((masterable) => masterable.master === master_id)
      .map((item) => item.id);
  }
  effect(state: State, action: { in_id: string; out_id: string }): void {
    const exchanger_id = (state.items[action.in_id] as MasterableItem).master;
    state.add_instruction(
      new TransferOwnershipInstruction(
        exchanger_id,
        this.master_id,
        action.in_id
      )
    );
    state.add_instruction(
      new TransferOwnershipInstruction(
        this.master_id,
        exchanger_id,
        action.out_id
      )
    );
  }
}

class SomeMasterable implements MasterableItem {
  title = "some test";
  id: string;
  constructor(public master: string) {
    this.id = uid();
  }
  intent(state: State): void {
    return;
  }
  update(state: State): void {
    Object.values(state.instructions).forEach((instruction) => {
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

const test = new State();
const cornfield = new CornFieldItem("2");
const something = new SomeMasterable("1");
test.add_item(something);
test.add_item(cornfield);
const business_intention = new BusinessCenterDealIntention(test, "1");
test.add_intention(business_intention);
business_intention.effect(test, { in_id: cornfield.id, out_id: something.id });
console.log(JSON.stringify(test, null, 5));

test.update_items();

console.log(JSON.stringify(test, null, 5));

export {};
