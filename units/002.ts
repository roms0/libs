import {
  Data,
  Enable,
  isEnabled,
  isMaster,
  isPromenade,
  Master,
  Promenade,
  State,
} from "./types";

function arch(item: any): item is Promenade & Enable & Master {
  return isPromenade(item) && isEnabled(item) && isMaster(item);
}

export function no_promenades(state: State, data: Data) {
  return Object.values(data)
    .filter(arch)
    .filter((item) => item.master !== state.turns(data).id)
    .every((item) => ((item as Enable).enabled = false));
}
