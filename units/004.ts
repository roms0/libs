import { Data, isEstablished, isMaster, State } from "./types";

export function something_has_been_built(state: State, data: Data) {
  const master = state.turns(data);
  return Object.values(data)
    .filter((item) => isMaster(item) && isEstablished(item))
    .some(
      (item) => item.established === state.turn && item.master === master.id
    );
}
