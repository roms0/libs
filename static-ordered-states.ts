type State = { goes(): void; does(): void };

let first = null as unknown as State;
let second = null as unknown as State;
let third = null as unknown as State;
let forth = null as unknown as State;

const hero = {
  state: first,
};

first = {
  does() {
    console.log("first goes");
    hero.state = second;
    second.goes();
  },
  goes() {
    console.log("first");
  },
};

second = {
  goes() {
    console.log("second goes");
    hero.state = third;
    third.goes();
  },
  does() {
    console.log("second");
  },
};

third = {
  goes() {
    console.log("third goes");
  },
  does() {
    console.log("third");
    hero.state = forth;
    forth.goes();
  },
};

forth = {
  goes() {
    console.log("forth goes");
  },
  does() {
    console.log("forth");
    hero.state = first;
    first.goes();
  },
};

hero.state = first;

hero.state.does();
hero.state.does();
hero.state.does();
hero.state.does();
hero.state.does();
hero.state.does();
