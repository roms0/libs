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

interface RouteLeg {
  from_office_id: number;
  routes: ForeignRoute[];
  to_office_id: number;
}

interface LegsResponse {
  legs: RouteLeg[];
  offices: {
    id: number;
  }[];
}

function groupOfficesFromLegs(res: LegsResponse) {
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

function groups(response: LegsResponse) {
  const routes = {};
  response.legs.forEach((leg) => {
    leg.routes.forEach((route) => {
      if (!routes[route.route_id]) {
        routes[route.route_id] = [];
      }
      routes[route.route_id].push([leg.from_office_id, leg.to_office_id]);
    });
  });
  console.log(routes);
  const starts = new Set();
  const ends = new Set();
  const transits = new Set();
  Object.values(routes).forEach((leg) => {
    console.log(leg);
  });
}

const ids = [0, 1, 2];

const t: LegsResponse = {
  offices: ids.map((id) => ({ id })),
  legs: [
    {
      from_office_id: ids[0],
      to_office_id: ids[1],
      routes: [
        { route_id: 100900, src_office_id: ids[0] },
        { route_id: 100902, src_office_id: ids[0] },
      ],
    },
    {
      from_office_id: ids[1],
      to_office_id: ids[0],
      routes: [{ route_id: 100901, src_office_id: ids[1] }],
    },
    {
      from_office_id: ids[1],
      to_office_id: ids[2],
      routes: [{ route_id: 100902, src_office_id: ids[0] }],
    },
  ],
};

// console.log(groupOfficesFromLegs(t));
groups(t);
