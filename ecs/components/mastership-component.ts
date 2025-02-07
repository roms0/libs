const mastership_component = "mastership_component";

type MastershipComponent = {
  [mastership_component]: number;
};

function is_mastership_component(item: any): item is MastershipComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    mastership_component in item &&
    typeof item[mastership_component] === "number" &&
    item[mastership_component] === null
  ) {
    return true;
  }
  return false;
}

export { mastership_component, is_mastership_component };
