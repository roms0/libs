import { HeroState } from "./model";

let first = null as unknown as HeroState;
let second = null as unknown as HeroState;
let third = null as unknown as HeroState;
let forth = null as unknown as HeroState;

const hero = {
  state: first,
};

first = {
  title: "first",
  reacts() {
    console.log("first starts");
    hero.state = second;
    second.starts();
  },
  starts() {
    console.log(this.title);
  },
};

second = {
  title: "second",
  starts() {
    console.log("second starts");
    hero.state = third;
    third.starts();
  },
  reacts() {
    console.log(this.title);
  },
};

third = {
  title: "third",
  starts() {
    console.log("third starts");
  },
  reacts() {
    console.log(this.title);
    hero.state = forth;
    forth.starts();
  },
};

forth = {
  title: "forth",
  starts() {
    console.log("forth starts");
  },
  reacts() {
    console.log(this.title);
    hero.state = first;
    first.starts();
  },
};

hero.state = first;

hero.state.reacts();
hero.state.reacts();
hero.state.reacts();
hero.state.reacts();
hero.state.reacts();
hero.state.reacts();
