import { Data, State } from "./types";

function untouch_all(state: State, data: Data, targets: string[]) {
  Object.values(data).forEach((item) => {
    delete item?.["touched"];
    delete item?.["whom"];
  });
}
