const title_component = "title_component";
const radiostation_title = "radiostation";

type TitleComponent = {
  [title_component]: string;
};

function is_title_component(item: any): item is TitleComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (title_component in item && typeof item[title_component] === "string") {
    return true;
  }
  return false;
}

function is_radiostation_title(item: any): boolean {
  if (is_title_component(item)) {
    item[title_component] === radiostation_title;
    return true;
  }
  return false;
}

export {
  title_component,
  is_title_component,
  is_radiostation_title,
  radiostation_title,
};
