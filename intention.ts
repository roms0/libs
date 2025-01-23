class Utils {
  uid() {
    return Math.trunc(Math.random() * 100) + "";
  }
}

class State {
  utils = new Utils();
  log() {
    console.log(this);
  }
  get dice(): DiceItem | null {
    if (this._dice) {
      return this._dice;
    }
    const dice = Object.values(this.items).find((item) => isDiceItem(item));
    if (!dice) {
      return null;
    }
    this._dice = dice;
    return dice;
  }
  private _dice: DiceItem;
  public intentions: Record<string, Intention<any>> = {};
  readonly items: Record<string, Item> = {};
  readonly actors: Record<string, Actor> = {};
  add_item(item_title: keyof typeof items_titles) {
    const item = new items[item_title](this);
    this.items[item.id] = item;
  }
  generate_intentions() {
    this.intentions = {};
    for (const id in this.items) {
      this.items[id].intention(this);
    }
  }
  perform_action(payload: {
    data: any;
    meta: { actor_id: string; iuid: string };
  }) {
    this.intentions[payload.meta.iuid].perform({
      data: payload.data,
      meta: { actor_id: payload.meta.actor_id },
    });
  }
  create_intention<T>(
    title: string,
    data: T,
    perform: (args: { data: T; meta: { actor_id: string } }) => void
  ) {
    const id = this.utils.uid();
    this.intentions[id] = { id, title, data, perform };
  }
}

class Actor {
  networth: number;
}

class Item {
  id: string;
  title: string;
  constructor(state: State) {
    this.id = state.utils.uid();
  }
  intention(state: State) {}
}

interface Intention<T> {
  id: string;
  title: string;
  data: T;
  perform: (args: { data: T; meta: { actor_id: string } }) => void;
}

class DiceItem extends Item {
  title = "dice";
  points = 0;
  intention(state: State): void {
    state.create_intention(items_titles.dice, null, () => {
      this.points = Math.trunc(Math.random() * 10);
    });
  }
}

function isDiceItem(item: Item) {
  return item instanceof DiceItem;
}

class SushiBarItem extends Item {
  title = "sushi_bar";
  intention(state: State): void {
    state.create_intention(
      items_titles.sushi_bar,
      {
        dice_id: Object.values(state.items).find(
          (item) => item.title === items_titles.dice
        )?.id,
      },
      ({ data }) => {
        if (!data.dice_id) return;
        const item = state.items[data.dice_id];
        if (isDiceItem(item)) {
          item.points = 100;
        }
      }
    );
  }
}

class BusinessCenterEstablishment extends Item {
  title = items_titles.business_center;
  intention(state: State): void {
    state.create_intention(
      this.title,
      { mine_id: state.items, his_id: state.items },
      () => {
        console.log("BUSINESS CENTER MECHANICS");
      }
    );
  }
}

class TechStrartupEstablishment extends Item {
  title = items_titles.tech_startup;
  networth = 1;
  intention(state: State): void {
    const dice = state.dice;
    if (!dice) return;
    if (dice.points !== 5) {
      state.create_intention(this.title, null, () => {
        console.log("INVEST");
      });
    }
    if (dice.points === 5) {
      state.create_intention(this.title, null, () => {
        console.log(`GET REVENUE ${this.networth}`);
      });
    }
  }
}

const items_titles = {
  dice: "dice",
  sushi_bar: "sushi_bar",
  business_center: "business_center",
  tech_startup: "tech_startup",
};

const items: { [K in keyof typeof items_titles]: typeof Item } = {
  dice: DiceItem,
  sushi_bar: SushiBarItem,
  business_center: BusinessCenterEstablishment,
  tech_startup: TechStrartupEstablishment,
};

// start
const state = new State();
state.add_item("tech_startup");
state.add_item("dice");
state.generate_intentions();
const diceint = Object.values(state.intentions).find(
  (intention) => intention.title === items_titles.dice
);
if (diceint) {
  state.perform_action({
    meta: { iuid: diceint?.id, actor_id: "1" },
    data: diceint?.data,
  });
}
state.generate_intentions();
const techint = Object.values(state.intentions).find(
  (intention) => intention.title === items_titles.tech_startup
);
console.log(state.dice?.points);
if (techint) {
  state.perform_action({
    meta: { iuid: techint?.id, actor_id: "1" },
    data: techint?.data,
  });
}

export {};
