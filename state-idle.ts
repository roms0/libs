import { HeroState } from "./model";

export const state_idle: HeroState = {
  title: "idle",
  starts() {
    console.log(this.title);
  },
  reacts() {},
};
