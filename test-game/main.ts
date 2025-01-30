class Payload {
  state_id: string;
  handler_id: string;
}

class Handler {
  id: string;
  handlePayload(payload: Payload): Message[] {
    return [];
  }
}
class Item {
  id: string;
  master_id: string;
  title: string;
  handleMessage(message: Message, reciever: Item) {}
  createIntentios(state: State) {}
}
class Message {
  id: string;
  initiator: Item;
}

class State {
  message_pointer: number;
  messages: Array<Message>;
  items: Record<string, Item>;
  handlers: Record<string, Handler>;
  add(o: Handler | Item | Handler) {
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

function loop(message: Payload, state: State, broadcast: () => void) {
  const handler = state.handlers[message.handler_id];
  const messages = handler.handlePayload(message);
  state.handlers = {};
  state.message_pointer = 0;
  state.messages = messages;
  while (state.message_pointer < state.messages.length) {
    for (const item_key in state.items) {
      state.items[item_key].handleMessage(
        state.messages[state.message_pointer],
        state.items[item_key]
      );
      broadcast();
    }
    state.message_pointer += 1;
  }
  state.message_pointer += 1;
  for (const item_key in state.items) {
    state.items[item_key].createIntentios(state);
  }
  state.messages = [];
  broadcast();
}

export {};
