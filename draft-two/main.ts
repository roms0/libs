import { commands } from "./commands";

const ins = [
  "unknown",
  "request_message",
  "hi",
  "find_sum",
  "find_sum",
  "shuffle_dice",
] as const;
const args = [[1], ["i can do that"], [null], [5, 4], [22, 1], []] as const;

ins.forEach((instr, i) => {
  if (!commands[instr]) return;
  commands[instr](...args[i]);
});
