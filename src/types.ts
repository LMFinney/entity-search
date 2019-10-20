export interface Country {
  id: number;
  name: string;
}

export interface Athlete {
  id: number;
  name: string;
  countryId: number;
}

export interface AthleteDisplay {
  name: string;
  countryName: string;
}

export interface PerformanceResult {
  length: number;
  simple: number;
  ['building the entity map']: number;
  ['searching with entity']: number;
  ['total time w/ entity']: number;
}
