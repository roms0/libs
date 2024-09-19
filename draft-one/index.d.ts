interface Array<T> {
  forEachFrom: (
    start: number,
    callbackfn: (value: any, index: number, array: any[]) => void
  ) => void;
}
