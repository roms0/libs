type Activated = {
  id: string;
  activation: number;
};

function is_activated(item: any): item is Activated {
  return (
    typeof item === "object" &&
    "activation" in item &&
    typeof item.activation === "number"
  );
}

export { is_activated };
