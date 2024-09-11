import { start_pipeline } from "./pipeline-state-machine";
import { state_idle } from "./state-idle";
import { state_take_dice } from "./state-take-dices";
import { state_toss_dice } from "./state-toss-dices";

let i = 0;
const states = [state_idle, state_take_dice, state_toss_dice];
start_pipeline(states, i);
