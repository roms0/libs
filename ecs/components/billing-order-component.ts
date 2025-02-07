const billing_order_component = "billing_order_component";

type BillingOrderComponent = {
  [billing_order_component]: number | null;
};

function is_billing_order_component(item: any): item is BillingOrderComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    billing_order_component in item &&
    typeof item[billing_order_component] === "number" &&
    item[billing_order_component] === null
  ) {
    return true;
  }
  return false;
}

export { billing_order_component, is_billing_order_component };
