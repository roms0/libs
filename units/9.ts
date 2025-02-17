import { Data, State } from "./types";

function transit(state: State, data: Data) {
  state.turn += 1;
  Object.values(data).forEach((item) => {
    delete item["placement"];
  });
}
