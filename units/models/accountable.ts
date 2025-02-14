type Accountable = {
  balance: number;
};

function is_accountable(item: any): item is Accountable {
  return (
    typeof item === "object" &&
    "balance" in item &&
    typeof item.balance === "number"
  );
}

export { is_accountable };
