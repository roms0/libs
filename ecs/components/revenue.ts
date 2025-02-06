const revenue_component = "revenue";

type RevenueComponent = {
  [revenue_component]: number;
};

function is_revenue_component(item: any): item is RevenueComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    revenue_component in item &&
    typeof item[revenue_component] === "number"
  ) {
    return true;
  }
  return false;
}

export { revenue_component, is_revenue_component };
