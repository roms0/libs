const charges_component = "charges_component";

type ChargesComponent = {
  [charges_component]: number;
};

function is_charges_component(item: any): item is ChargesComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    charges_component in item &&
    typeof item[charges_component] === "number"
  ) {
    return true;
  }
  return false;
}

export { charges_component, is_charges_component };
