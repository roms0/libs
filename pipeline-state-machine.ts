import { StatePipeline } from "./model";

export function push_forward(sequence: StatePipeline, index: number) {
  index += 1;
  const anew = index === sequence.length;
  if (anew) index = 0;
  sequence[index].starts(index, sequence);
}

export function to_idle(sequence: StatePipeline, index: number) {
  index = 0;
  sequence[index].starts(index, sequence);
}

export function start_pipeline(sequence: StatePipeline, index: number) {
  index = 1;
  sequence[index].starts(index, sequence);
}
