import { State } from "../models/state";

function get_state(items: Record<string, unknown>) {
  return items["state"] as State;
}

export { get_state };
