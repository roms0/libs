import { HeroState } from "./model";
import { push_forward } from "./pipeline-state-machine";

export const state_toss_dice: HeroState = {
  title: "toss dices",
  starts(i: number, pie) {
    console.log(this.title);
    push_forward(pie, i);
  },
  reacts() {},
};
