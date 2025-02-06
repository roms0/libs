const woods_mult_component = "woods_multiplier";

type WoodsMultiplierComponent = {
  [woods_mult_component]: number;
};

function is_woods_mult_component(item: any): item is WoodsMultiplierComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    woods_mult_component in item &&
    typeof item[woods_mult_component] === "number"
  ) {
    return true;
  }
  return false;
}

export { woods_mult_component, is_woods_mult_component };
