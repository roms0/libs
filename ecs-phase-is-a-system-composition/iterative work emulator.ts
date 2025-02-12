abstract class SomeState {
  abstract stages: Stage[];
  abstract stage: Stage;
  abstract title: string;
  abstract id: string;
  abstract scan(data: Data, stages: Stage[]): void;
  abstract clean(): void;
}

abstract class BasicItem {
  abstract title: string;
  abstract id: string;
}

type PossibleItem = BasicItem | SomeFirstPrototypeItem;

type Data = Record<string, PossibleItem>;

abstract class Stage {
  abstract see(state: SomeState, data: Data): void;
  abstract do(state: SomeState, data: Data): void;
  abstract clean(): void;
}

class State implements SomeState {
  constructor(public stages: Stage[]) {}
  stage = new WhiteStage();
  title = "state";
  id = "0";
  scan(data: Data) {
    console.log("switch phase");
    this.stage = new WhiteStage();
    this.stages.forEach((stage) => stage.see(this, data));
  }
  clean() {
    this.stages.forEach((stage) => stage.clean());
  }
}

abstract class SomeFirstPrototypeItem extends BasicItem {
  abstract points: number;
}

class WhiteStage implements Stage {
  see(state: SomeState, data: Data) {
    if (state.stage instanceof WhiteStage) {
      state.clean();
      state.scan(data, state.stages);
    }
  }
  do(state: SomeState, data: Data) {
    console.log("no stage");
  }
  clean() {}
}

class FirstStage implements Stage {
  private cache: SomeFirstPrototypeItem | undefined;
  private interactions = 0;
  see(state: SomeState, data: Data) {
    if (state.stage instanceof WhiteStage && this.interactions < 2) {
      if (!this.cache) {
        console.log("do caching");
        for (let key in data) {
          if ("points" in data[key]) {
            this.cache = data[key];
          }
        }
      }
      state.stage = this;
    }
  }
  do(state: SomeState, data: Data) {
    console.log("first stage do");
    this.interactions += 1;
    if (this.interactions > 1) {
      state.scan(data, state.stages);
    }
  }
  clean() {
    console.log("clean first stage");
    this.interactions = 0;
  }
}

class SecondStage implements Stage {
  private cache: SomeFirstPrototypeItem | undefined;
  private interactions = 0;
  see(state: SomeState, data: Data) {
    if (state.stage instanceof WhiteStage && this.interactions < 2) {
      if (!this.cache) {
        console.log("do caching second");
        for (let key in data) {
          if ("points" in data[key]) {
            this.cache = data[key];
          }
        }
      }
      state.stage = this;
    }
  }
  do(state: SomeState, data: Data) {
    console.log("second stage do");
    this.interactions += 1;
    if (this.interactions > 2) {
      state.scan(data, state.stages);
    }
  }
  clean() {
    console.log("clean second stage");
    this.interactions = 0;
  }
}

const stage1 = new FirstStage();
const stage1a = new FirstStage();
const stage2 = new SecondStage();
const white = new WhiteStage();
const state = new State([stage1, stage2, stage1a, white]);
const data = {
  "1": {
    title: "title",
    id: "1",
  },
  "2": {
    title: "pointful",
    id: "2",
    points: 5,
  },
};

state.scan(data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
state.stage.do(state, data);
