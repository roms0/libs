const filters_titles = {
  mine_establishments: "mine_establishments",
  someones_establishments: "someones_establishments",
  draft_something: "draft_something",
};

const filters = {
  mine_establishments: () => {
    return {
      exact: 1,
      items: [],
    };
  },
  someones_establishments: () => {
    return {
      exact: 1,
      items: [],
    };
  },
  draft_something: () => {
    return {
      max: 3,
      min: 1,
      items: [],
    };
  },
};

const intention_args = [
  filters_titles.mine_establishments,
  filters_titles.someones_establishments,
];

const another_intention_args = [filters_titles.draft_something];
