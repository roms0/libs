const dice_receiver_component = "dice_receiver";

type DiceReceiverComponent = {
  [dice_receiver_component]: number | null;
};

function is_dice_receiver_component(item: any): item is DiceReceiverComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    dice_receiver_component in item &&
    typeof item[dice_receiver_component] === "number"
  ) {
    return true;
  }
  return false;
}

export { dice_receiver_component, is_dice_receiver_component };
