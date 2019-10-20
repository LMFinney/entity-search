import { address, name } from 'faker';
import { convertEntity, convertSimple } from './converters';
import { Athlete, Country, PerformanceResult } from './types';

console.clear();

export const countries: Country[] = [
  { id: 1, name: 'USA' },
  { id: 2, name: 'Canada' },
  { id: 3, name: 'Russia' },
  { id: 4, name: 'France' }
];
export const athletes: Athlete[] = [
  { id: 1, name: 'Jane Alexander', countryId: 1 },
  { id: 2, name: 'Henri Lamarque', countryId: 4 },
  { id: 3, name: 'Bobby Thomas', countryId: 2 },
  { id: 4, name: 'Lyudmila Belyaeva', countryId: 3 },
  { id: 5, name: 'Marie Combe', countryId: 4 }
];

const [simpleResult, simpleTime] = convertSimple(athletes, countries);
console.table(simpleResult);
console.log('simple time', +simpleTime.toFixed(3));
const [entityResult, entityBuildMap, entitySearch] = convertEntity(
  athletes,
  countries
);
console.table(entityResult);
console.log('entity time', +(entityBuildMap + entitySearch).toFixed(3));

const results = [1, 10, 100, 1000, 10000, 100000].map(length =>
  checkPerformance(length)
);
console.table(results);

function checkPerformance(length: number): PerformanceResult {
  const generatedCountries: Country[] = initializeCountries(length);
  const generatedAthletes: Athlete[] = initializeAthletes(length);

  const [, buildMap, search] = convertEntity(
    generatedAthletes,
    generatedCountries
  );
  return {
    length,
    simple: +convertSimple(generatedAthletes, generatedCountries)[1].toFixed(3),
    ['building the entity map']: +buildMap.toFixed(3),
    ['searching with entity']: +search.toFixed(3),
    ['total time w/ entity']: +(buildMap + search).toFixed(3)
  };
}

function initializeCountries(length: number) {
  return Array.from({ length }, (_, index: number) => ({
    id: index,
    name: address.country()
  }));
}

function initializeAthletes(length: number) {
  return Array.from({ length }, (_, index: number) => ({
    countryId: getRandomInt(length),
    id: index,
    name: name.findName()
  }));
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
