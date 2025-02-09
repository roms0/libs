function charges(arg: number) {
  return { charges: arg };
}

class Item {
  constructor(public title: string) {}
  charges?: number;
  uses?: number;
  masters?: number;
  manas?: number;
  charge(arg: number) {
    this.charges = arg;
    return this;
  }
  use(arg: number) {
    this.uses = arg;
    return this;
  }
  master(arg: number) {
    this.masters = arg;
    return this;
  }
  mana(arg: number) {
    this.manas = arg;
    return this;
  }
}

const msw = new Item("magic sword").charge(1).use(0).master(1);
msw.manas = 500;
console.log(msw);
