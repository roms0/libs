import { DiceHandler } from "./handlers/dice-handler";
import { Dice } from "./items/dice";
import { Table } from "./items/table";
import { Tosser } from "./items/tosser";
import { Turn } from "./items/turn";
import { Handler, loop, State } from "./main";

const state = new State();
const misha = new Tosser();
const oleg = new Tosser();
state.add(misha);
state.add(oleg);
state.add(new Table({ [misha.id]: oleg.id, [oleg.id]: misha.id }));
state.add(new Dice());
state.add(new Turn(misha.id));

const dice_handler = new DiceHandler(misha.id);
state.add(dice_handler);

console.log(state);
loop({ state_id: state.id, handler_id: dice_handler.id }, state, () => {
  console.log(state);
});
const nhid = Object.values(state.handlers).find(
  (handler) => handler.title === "dice handler"
)?.id;
if (nhid) {
  loop({ state_id: state.id, handler_id: nhid }, state, () => {
    console.log(state);
  });
}
