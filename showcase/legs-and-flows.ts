interface Office {
  id: number;
  name: string;
}

interface Leg {
  from_office_id: number;
  to_office_id: number;
  distance: number;
  flows: FlowInfo[];
}

interface FlowInfo {
  avg_day_polybox_qty: number;
  flow_id: string;
  src_office: Office;
  dst_office: Office;
}
interface MatchedFlowInfo {
  total_distance: number;
  transit_offices: Office[];
  legs: Leg[];
}

type FlowDto = FlowInfo & MatchedFlowInfo;

class MagistralFlows {
  legs: { from: number; to: number; distance: number }[] = [];
  flows: {
    volume: number;
    id: string;
    from: Office;
    to: Office;
    legs: number[];
  }[] = [];
  accented: string;
  constructor(fromServer: FlowDto) {
    this.flows.push({
      volume: fromServer.avg_day_polybox_qty,
      id: fromServer.flow_id,
      from: fromServer.src_office,
      to: fromServer.dst_office,
      legs: Array(fromServer.legs.length)
        .fill(undefined)
        .map((_, i) => i),
    });
    this.accented = fromServer.flow_id;
    fromServer.legs.forEach((leg, i) => {
      this.legs.push({
        from: leg.from_office_id,
        to: leg.to_office_id,
        distance: leg.distance,
      });
      leg.flows.forEach((flow) => {
        if (flow.flow_id === fromServer.flow_id) return;
        const f = this.flows.find((f) => f.id === flow.flow_id);
        if (!f) {
          this.flows.push({
            volume: flow.avg_day_polybox_qty,
            id: flow.flow_id,
            from: flow.src_office,
            to: flow.dst_office,
            legs: [i],
          });
        } else {
          f.legs.push(i);
        }
      });
    });
  }
}

function arrangeFlows(data: MagistralFlows) {
  data.flows.forEach(({ volume, id, from, to, legs }, flowIndex) => {
    if (flowIndex === 0) {
      this.id = id;
    }
    let len = 1;
    let chunkStart = legs[0];
    const chunks: { grid: string; volume: number }[] = [];
    legs.forEach((leg, legIndex, legs) => {
      if (!this.legs[leg]) {
        this.totalDistance += data.legs[leg].distance;
        this.legs[leg] = {
          distance: data.legs[leg].distance,
          from: data.legs[leg].from,
          to: data.legs[leg].to,
          volume,
        };
      } else {
        this.legs[leg].volume += volume;
      }
      if (legs[legIndex + 1] === undefined || legs[legIndex + 1] - leg > 1) {
        chunks.push({
          grid: `grid-row: 1; grid-column: ${chunkStart + 4} / span ${len}`,
          volume,
        });
        len = 1;
        chunkStart = legs[legIndex + 1] || 0;
      } else {
        len += 1;
      }
    });
    this.flows.push({
      volume,
      id,
      from,
      to,
      legs: "",
      chunks,
    });
  });
}
