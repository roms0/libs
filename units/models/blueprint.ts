type Blueprint = {
  cost: number;
};

function is_blueprint(item: any): item is Blueprint {
  return (
    typeof item === "object" &&
    ["cost"].every((key) => key in item && typeof item[key] === "number")
  );
}

export { is_blueprint, Blueprint };
