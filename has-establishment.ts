import { Establishments, EstablishmentsOwnershipState } from "./model";

export function has_they_establishment<T extends string>(
  title: string,
  hero: number,
  establishemnts: Establishments<T>,
  establishment_ownership: EstablishmentsOwnershipState
) {
  return establishemnts.some(
    (t, index) => t === title && establishment_ownership[index] === hero
  );
}

console.log(has_they_establishment("socket", 0, ["socket"], [-1]));
