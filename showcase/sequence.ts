function sequence(s: [number, number][]) {
  const firsts = new Set();
  const seconds = new Set();
  const all = new Set();
  for (let k = 0; k < s.length; k++) {
    all.add(s[k][0]);
    all.add(s[k][1]);
    firsts.add(s[k][0]);
    seconds.add(s[k][1]);
  }
  const starts = new Set();
  const ends = new Set();
  const trans = new Set();
  all.forEach((item) => {
    if (seconds.has(item) && firsts.has(item)) {
      trans.add(item);
      return;
    }
    if (seconds.has(item)) {
      ends.add(item);
      return;
    }
    if (firsts.has(item)) {
      starts.add(item);
      return;
    }
  });
  console.log(starts);
  console.log(ends);
  console.log(trans);
}

sequence([
  [4, 5],
  [6, 5],
  [3, 4],
  [5, 6],
]);
