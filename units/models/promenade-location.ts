type PromenadeLocation = {
  id: string;
  fee: number;
  placement: number;
  master: string;
};

function is_promenade_location(item: any): item is PromenadeLocation {
  return (
    typeof item === "object" &&
    ["fee", "placement"].every(
      (key) => key in item && typeof item[key] === "number"
    ) &&
    ["master"].every((key) => key in item && typeof item[key] === "string")
  );
}

export { is_promenade_location, PromenadeLocation };
