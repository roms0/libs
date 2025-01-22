class Utils {
  uid() {
    return Math.trunc(Math.random() * 100) + "";
  }
}

class State {
  utils = new Utils();
  readonly intentions: Record<string, Intention> = {};
  readonly items: Record<string, StateItem> = {};
  add_intention(intention: Intention) {
    this.intentions[intention.id] = intention;
  }
  add_item(item_title: keyof typeof items_titles) {
    const item = new items[item_title](this);
    this.items[item.id] = item;
  }
  generate_intentions() {
    for (const id in this.items) {
      this.items[id].intention(this);
    }
  }
  perform_action(payload: { iuid: string; data: unknown }) {
    this.intentions[payload.iuid].perform(payload.data);
  }
}

class StateItem {
  id: string;
  title: string;
  constructor(state: State) {
    this.id = state.utils.uid();
  }
  intention(state: State) {}
}

function createIntention<T>(
  state: State,
  title: string,
  data: T,
  perform: (data: T) => void
): Intention {
  return {
    id: state.utils.uid(),
    title,
    data,
    perform,
  };
}

interface Intention {
  id: string;
  title: string;
  data: unknown;
  perform: (data) => void;
}

class DiceItem extends StateItem {
  title = "dice";
  points = 0;
  intention(state: State): void {
    state.add_intention(
      createIntention(state, items_titles.dice, { points: 1 }, ({ points }) => {
        this.points = Math.trunc(Math.random() * 10);
      })
    );
  }
}

function isDiceItem(item: StateItem) {
  return "points" in item;
}

class SushiBarItem extends StateItem {
  title = "sushi_bar";
  intention(state: State): void {
    state.add_intention(
      createIntention(
        state,
        items_titles.sushi_bar,
        {
          dice_id: Object.values(state.items).find(
            (item) => item.title === items_titles.dice
          )?.id,
        },
        ({ dice_id }) => {
          console.log(dice_id);
          if (!dice_id) return;
          if (isDiceItem(state.items[dice_id])) {
            state.items[dice_id].points = 100;
          }
        }
      )
    );
  }
}

const items_titles = {
  dice: "dice",
  sushi_bar: "sushi_bar",
};

const items: { [K in keyof typeof items_titles]: typeof StateItem } = {
  dice: DiceItem,
  sushi_bar: SushiBarItem,
};

// start
const state = new State();
state.add_item("dice");
state.add_item("sushi_bar");
state.generate_intentions();

const intention = Object.values(state.intentions).find(
  (intention) => intention.title === items_titles.sushi_bar
);
if (intention) {
  state.perform_action({ iuid: intention?.id, data: intention?.data });
}

export {};
