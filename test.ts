enum USECASES {
  INIT_DICE_STATE = "INIT_DICE_STATE",
  GATHER_HORDE = "GATHER_HORDE",
  BUILD_FARM = "BUILD_FARM",
}

enum RULES {
  DICE_INIT = "DICE_INIT",
  BUILD_FARM = "BUILD_FARM",
}

enum RULE_IMPLEMENTATIONS {
  DEFAULT_DICE_INIT = "DEFAULT_DICE_INIT",
  POPULIST_DICE_INIT = "POPULIST_DICE_INIT",
  DEFAULT_BUILD_FARM = "DEFAULT_BUILD_FARM",
}

enum TITLES {
  CASTLE = "CASTLE",
  CAMP = "CAMP",
  FARM = "FARM",
}

enum STATES {
  DICE = "DICE",
}

export const rule = {
  [RULE_IMPLEMENTATIONS.DEFAULT_DICE_INIT]: (state) => {
    state.actors[state.marked].establishments.forEach((establishment) => {
      if (state.establishments[establishment].title === TITLES.CAMP) {
        state.establishments[establishment][STATES.DICE] = {
          count: 1,
          usecase: USECASES.GATHER_HORDE,
        };
      }
    });
  },
  [RULE_IMPLEMENTATIONS.POPULIST_DICE_INIT]: (state) => {
    state.actors[state.marked].establishments.forEach((establishment) => {
      if (state.establishments[establishment].title === TITLES.CAMP) {
        state.establishments[establishment][STATES.DICE] = {
          count: 2,
          usecase: USECASES.GATHER_HORDE,
        };
      }
    });
  },
  [RULE_IMPLEMENTATIONS.DEFAULT_BUILD_FARM]: (state) => {
    const id = 5;
    state.actors[state.marked].establishments.push(5);
    state.establishments[id] = {
      title: TITLES.FARM,
    };
    state.actors[state.marked].rules[RULES.DICE_INIT].push(
      RULE_IMPLEMENTATIONS.POPULIST_DICE_INIT
    );
  },
};

function act(state, r: RULES) {
  rule[state.actors[state.marked].rules[r].at(-1)](state);
}

export const usecase = {
  [USECASES.INIT_DICE_STATE]: (state) => {
    act(state, RULES.DICE_INIT);
  },
  [USECASES.GATHER_HORDE]: () => {},
  [USECASES.BUILD_FARM]: (state) => {
    act(state, RULES.BUILD_FARM);
  },
};

const state = {
  establishments: {
    1: {
      title: TITLES.CASTLE,
    },
    2: {
      title: TITLES.CASTLE,
    },
    3: {
      title: TITLES.CAMP,
    },
  },
  marked: [111],
  actors: {
    111: {
      establishments: [1, 3],
      rules: {
        [RULES.DICE_INIT]: [RULE_IMPLEMENTATIONS.DEFAULT_DICE_INIT],
        [RULES.BUILD_FARM]: [RULE_IMPLEMENTATIONS.DEFAULT_BUILD_FARM],
      },
    },
  },
};

function receive(u: USECASES) {
  usecase[u](state);
}

receive(USECASES.BUILD_FARM);
receive(USECASES.INIT_DICE_STATE);
console.log(state.establishments);
console.log(state.actors);

export {};
