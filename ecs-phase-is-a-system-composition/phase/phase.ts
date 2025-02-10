abstract class Phase {
  abstract start_condition(
    state: unknown,
    items: Record<string, unknown>
  ): void;
  abstract setup(state: unknown, items: Record<string, unknown>): void;
  abstract process_input(inputs: Record<string, unknown>): void;
  abstract input_script(inputs: Record<string, unknown>): void;
  abstract process_entities(
    state: unknown,
    items: Record<string, unknown>
  ): void;
  abstract final_condition(
    state: unknown,
    items: Record<string, unknown>
  ): void;
  abstract cleanup(state: unknown, items: Record<string, unknown>): void;
}

export { Phase };
