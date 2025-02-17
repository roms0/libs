import { Data, isCost, isEstablished, isMaster, State } from "./types";

export function not_enough_coins(state: State, data: Data) {
  const master = state.turns(data);
  return Object.values(data)
    .filter((item) => isCost(item))
    .filter((item) => !isMaster(item) && !isEstablished(item))
    .every((item) => item.cost > master.balance);
}
