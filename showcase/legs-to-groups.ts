function firstDestinationPoint(legs: number[][]) {
  let start = -1;
  const banned = new Set<number>();
  legs.forEach((leg, i, arr) => {
    banned.add(leg[1]);
    if (!banned.has(leg[0])) {
      start = leg[0];
    } else {
      start = (arr.find((val) => !banned.has(val[0])) as [number, number])[0];
    }
  });
  return { start, banned };
}

function lastDestinationPoint(legs: number[][]) {
  let last = -1;
  const banned = new Set<number>();
  legs.forEach((leg, i, arr) => {
    banned.add(leg[0]);
    if (!banned.has(leg[1])) {
      last = leg[1];
    } else {
      last = (arr.find((val) => !banned.has(val[1])) as [number, number])[1];
    }
  });
  return { last, banned };
}

interface ForeignRoute {
  route_id: number;
  src_office_id: number;
}

interface Response {
  legs: {
    from_office_id: number;
    routes: ForeignRoute[];
    to_office_id: number;
  }[];
  offices: {
    id: number;
  }[];
}

function groupOfficesFromLegs(res: Response) {
  const routes = {} as Record<number, number[][]>;
  const startOffices = new Set<number>();
  const transitOffices = new Set<number>();
  const finishOffices = new Set<number>();
  res.legs.forEach((leg) => {
    leg.routes.forEach((route) => {
      if (!routes[route.route_id]) {
        routes[route.route_id] = [];
      }
      routes[route.route_id].push([leg.from_office_id, leg.to_office_id]);
    });
  });
  Object.values(routes).forEach((route) => {
    const { start, banned: notfirst } = firstDestinationPoint(route);
    startOffices.add(start);
    const { last, banned: notlast } = lastDestinationPoint(route);
    finishOffices.add(last);
    notfirst.forEach((nf) => {
      if (notlast.has(nf)) {
        transitOffices.add(nf);
      }
    });
  });
  return { startOffices, transitOffices, finishOffices };
}
