import { Phase } from "./phase";

interface StateItemArchetype {
  actors_arrangement: string[];
  protagonist_pos: number;
  protagonist_promenade_pos: number;
  promenade_len: number;
  phase: Phase | null;
}

function is_state(item: unknown): item is StateItemArchetype {
  return (
    item !== null &&
    typeof item === "object" &&
    "actors_arrangement" in item &&
    Array.isArray(item.actors_arrangement) &&
    "protagonist_pos" in item &&
    typeof item.protagonist_pos === "number" &&
    "protagonist_promenade_pos" in item &&
    typeof item.protagonist_promenade_pos === "number" &&
    "promenade_len" in item &&
    typeof item.promenade_len === "number" &&
    "phase" in item
  );
}

interface PromenadeArchetype {
  fee: number;
  host: number;
  promenade_placement: number;
  balance: number;
  points_consumer: number;
  points_condition: number;
}

function is_arch(item: unknown): item is PromenadeArchetype {
  return (
    item !== null &&
    typeof item === "object" &&
    "fee" in item &&
    typeof item.fee === "number" &&
    "host" in item &&
    typeof item.host === "number" &&
    "promenade_placement" in item &&
    typeof item.promenade_placement === "number" &&
    "balance" in item &&
    typeof item.balance === "number" &&
    "points_consumer" in item &&
    typeof item.points_consumer === "number" &&
    "points_condition" in item &&
    typeof item.points_condition === "number"
  );
}

export class PromenadePhase implements Phase {
  archs = {};
  start_condition(state: unknown, items: Record<string, unknown>): void {
    if (!is_state(state)) {
      return;
    }
    for (const id in items) {
      if (is_arch(items[id])) {
        this.archs[id] = items[id];
      }
    }
  }
  setup(state: unknown, items: Record<string, unknown>): void {}
  process_input(inputs: Record<string, unknown>): void {}
  input_script(inputs: Record<string, unknown>): void {}
  process_entities(state: unknown, items: Record<string, unknown>): void {}
  final_condition(state: unknown, items: Record<string, unknown>): void {}
  cleanup(state: unknown, items: Record<string, unknown>): void {}
}
