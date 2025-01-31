import { ChangeMessage, Handler, Item, State } from "./main";

export class Board extends Item {
  turn: Turn;
  constructor(public arrangement: Record<string, string>) {
    super("board");
    this.turn = new Turn(Object.keys(this.arrangement)[0]);
  }
  intent(state: State): void {
    if (!this.turn) {
      return;
    }
    state.add(
      new Handler(this.turn.protagonist_id, "pass", () => {
        return [new ChangeMessage<Board>(this, "turn", this.turn, null)];
      })
    );
  }
  change(message: ChangeMessage<Board>, state: State): void {
    if (message.item instanceof Board && message.prop === "turn") {
      if (!message.fresh) {
        const current_protagonist_id = message.item.turn.protagonist_id;
        const fresh_protagonist_id = this.arrangement[current_protagonist_id];
        delete state.items[this.turn.id];
        state.add(
          new ChangeMessage<Board>(
            message.item,
            "turn",
            null,
            new Turn(fresh_protagonist_id)
          )
        );
      }
      if (message.fresh instanceof Turn) {
        this.turn = message.fresh;
        state.add(this.turn);
      }
    }
  }
}

class Turn extends Item {
  constructor(public protagonist_id: string) {
    super("turn");
  }
}
