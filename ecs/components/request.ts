const request_component = "request_component";

type RequestComponent = {
  [request_component]: boolean;
};

function is_request_component(item: any): item is RequestComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    request_component in item &&
    typeof item[request_component] === "boolean"
  ) {
    return true;
  }
  return false;
}

export { request_component, is_request_component };
