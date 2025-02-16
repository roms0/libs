import { Data, isDices, isMaster, isPoints, State } from "./types";

export function some_supplier_supplied_points(state: State, data: Data) {
  const suppliers = Object.values(data).filter(
    (item) => isDices(item) && isMaster(item)
  );
  return suppliers.some(
    (supplier) => supplier.master === state.turns(data).id && isPoints(supplier)
  );
}
