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
  buildingMap: number;
  keyBySearch: number;
  keyByTotal: number;
}
