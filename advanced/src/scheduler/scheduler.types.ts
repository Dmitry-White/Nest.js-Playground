type IntervalMethod = {
  method: string;
  interval: number;
};

type HostProvider = {
  hostInstance: object;
  intervalMethods: IntervalMethod[];
};

export type { HostProvider, IntervalMethod };
