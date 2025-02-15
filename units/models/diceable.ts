type Diceable = {
  dices: number;
};

function is_diceable(item: any): item is Diceable {
  return (
    typeof item === "object" &&
    ["dices"].every((key) => key in item && typeof item[key] === "number")
  );
}

export { is_diceable, Diceable };
