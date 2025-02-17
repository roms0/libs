import { Data, State, touch } from "./types";

function assign_touches(state: State, data: Data, targets: string[]) {
  targets.forEach((id, i) => {
    touch(data[id], i + 1, state.turns(data).id);
  });
}
