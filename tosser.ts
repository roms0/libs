const fish_base_income = 1;
const farm_base_income = 1;
const shop_base_income = 1;

const table = {
  fish: [2, 3, 5],
  farm: [3, 1, 1],
  shop: [1, 1, 2],
};

type Cards = keyof typeof table;

const greens: Cards[] = ["shop"];
const blues: Cards[] = ["fish", "farm"];

const spends: Record<Cards, [number] | [number, Cards[]]> = {
  fish: [1],
  farm: [1],
  shop: [1, ["farm", "fish"]],
};

greens.forEach((green) => {
  let sum = 0;
  for (let i = 1; i <= table[green][2]; i++) {
    sum += create_check(green, spends[green]);
  }
  console.log(sum);
});

function create_check(title: Cards, config: [number] | [number, Cards[]]) {
  if (!config[1]) return config[0] * table[title][2];
  return config[1].reduce((previous, current) => {
    return (previous as number) + table[current][2] * config[0];
  }, 0);
}
