export class Payload {
  state_id: string;
  handler_id: string;
}

function uid() {
  return Math.trunc(Math.random() * 10000) + "";
}

export class Handler {
  id: string;
  title: string;
  constructor(public master_id: string) {
    this.id = uid();
  }
  handle(payload: Payload): Message[] {
    return [];
  }
}

export class Item {
  id: string;
  master_id: string;
  title: string;
  constructor() {
    this.id = uid();
  }
  message(message: Message, state: State, reciever: Item) {}
  intentions(state: State) {}
}

export class Message {
  public id: string;
  constructor(public master_id: string) {
    this.id = uid();
  }
}

export class State {
  id: string;
  constructor() {
    this.id = uid();
  }
  message_pointer: number = 0;
  messages: Array<Message> = [];
  items: Record<string, Item> = {};
  handlers: Record<string, Handler> = {};
  add(o: Handler | Item | Message) {
    if (o instanceof Handler) {
      this.handlers[o.id] = o;
    }
    if (o instanceof Item) {
      this.items[o.id] = o;
    }
    if (o instanceof Message) {
      this.messages.push(o);
    }
  }
}

export function loop(message: Payload, state: State, broadcast: () => void) {
  const handler = state.handlers[message.handler_id];
  const messages = handler.handle(message);
  state.handlers = {};
  state.message_pointer = 0;
  state.messages = messages;
  while (state.message_pointer < state.messages.length) {
    for (const item_key in state.items) {
      state.items[item_key].message(
        state.messages[state.message_pointer],
        state,
        state.items[item_key]
      );
      //   broadcast();
    }
    state.message_pointer += 1;
  }
  state.message_pointer += 1;
  for (const item_key in state.items) {
    state.items[item_key].intentions(state);
  }
  state.messages = [];
  broadcast();
}

export {};
