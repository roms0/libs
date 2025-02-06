const woods_supplier_component = "woods_supplier";

type WoodsSupplierComponent = {
  [woods_supplier_component]: number;
};

function is_woods_supplier_component(
  item: any
): item is WoodsSupplierComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    woods_supplier_component in item &&
    typeof item[woods_supplier_component] === "number"
  ) {
    return true;
  }
  return false;
}

export { woods_supplier_component, is_woods_supplier_component };
