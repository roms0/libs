Array.prototype.forEachFrom = function (start, callback) {
  let track = 0;
  if (start > 0 && start < this.length - 1) {
    track = start;
  }
  do {
    callback(this[track], track, this);
    track = track < this.length - 1 ? track + 1 : 0;
  } while (track !== start);
};
