import { Establishments, EstablishmentsOwnershipState } from "./model";

export function has_they_establishment(
  title: string,
  hero: number,
  establishemnts: Establishments,
  establishment_ownership: EstablishmentsOwnershipState
) {
  return establishemnts.some(
    (t, index) => t === title && establishment_ownership[index] === hero
  );
}
