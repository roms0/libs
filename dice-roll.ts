function assigner(i: Uint8Array) {
  self.crypto.getRandomValues(i);
  return i.map((n) => Math.trunc(n / 44) + 1);
}

function roll_dice_count(k: number): number[] {
  const array = new Uint8Array(k);
  return assigner(array) as unknown as number[];
}

export const single_dice = () => roll_dice_count(1);
export const double_dice = () => roll_dice_count(2);
