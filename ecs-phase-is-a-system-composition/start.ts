type Placement = {
  placement: number;
};

type DiningCost = {
  dining_cost: number;
};

type PointsConsumer = {
  points: number;
};

type Masterable = {
  master: number;
};

type Cost = {
  cost: number;
};

type Protagonist = {
  protagonist: number;
};

const restraunt_blueprint: Cost = {
  cost: 6,
};

const restraunt: DiningCost & PointsConsumer & Masterable = {
  dining_cost: 2,
  points: 4,
  master: 0,
};

const a: Placement & Cost & Masterable & Protagonist = {
  master: 0,
  placement: 0,
  cost: 2,
  protagonist: 1,
};

const b: Placement & Cost & Masterable & Protagonist = {
  master: 0,
  placement: 1,
  cost: 3,
  protagonist: 1,
};

//
// 01
//
// AAAA122234
// 0000000011
//
// 23

// generate billings
// point supplier => point consumer => billings

// billing

//

// activation group component
// placement component

// activation system
//
// placement counter = 1
//
//

class SomeSystem {
  static calculate() {}
}

class SomeCommonSystem {
  static calculate() {}
}

class SomeComplicatedSystem {
  static calculate() {}
}

class PublishPointsPhase {
  static update() {
    SomeSystem.calculate();
    SomeCommonSystem.calculate();
  }
}

class ConsumePointsPhase {
  static update() {
    SomeComplicatedSystem.calculate();
    SomeCommonSystem.calculate();
  }
}

const state_entity = {};
const command = {};

PublishPointsPhase.update();
ConsumePointsPhase.update();

export {};
