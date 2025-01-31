function uid() {
  return Math.trunc(Math.random() * 10000) + "";
}

export class Item {
  id: string;
  constructor(public title: string) {
    this.id = uid();
  }
  change(message: ChangeMessage<any>, state: State) {}
  intent(state: State) {}
}

export class ChangeMessage<T extends Item> {
  public id: string;
  constructor(
    public item: T,
    public prop: keyof T,
    public stale: T[keyof T] | null,
    public fresh: T[keyof T] | null
  ) {
    this.id = uid();
  }
}

export class Payload {
  state_id: string;
  handler_id: string;
}

export class Handler {
  id: string;
  constructor(
    public actor_id: string,
    public title: string,
    public handle: (payload: Payload) => ChangeMessage<any>[]
  ) {
    this.id = uid();
  }
}

export class State {
  id: string;
  constructor() {
    this.id = uid();
  }
  message_pointer: number = 0;
  changes: Array<ChangeMessage<Item>> = [];
  items: Record<string, Item> = {};
  handlers: Record<string, Handler> = {};
  add(o: Handler | Item | ChangeMessage<any>) {
    if (o instanceof Handler) {
      this.handlers[o.id] = o;
    }
    if (o instanceof Item) {
      this.items[o.id] = o;
    }
    if (o instanceof ChangeMessage) {
      this.changes.push(o);
    }
  }
}

export async function loop(
  message: Payload,
  state: State,
  broadcast: () => void
) {
  const handler = state.handlers[message.handler_id];
  if (handler) {
    const changes = handler.handle(message);
    state.changes = changes;
    for (let i = 0; i < state.changes.length; i++) {
      state.message_pointer = i;
      for (const item_key in state.items) {
        state.items[item_key].change(
          state.changes[state.message_pointer],
          state
        );
      }
      broadcast();
      await new Promise((res) => setTimeout(res, 800));
    }
    state.handlers = {};
  }
  for (const item_key in state.items) {
    state.items[item_key].intent(state);
  }
  state.changes = [];
}
