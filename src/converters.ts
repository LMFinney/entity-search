import { keyBy } from 'lodash';
import { performance } from 'perf_hooks';
import { Athlete, AthleteDisplay, Country } from './types';

export function convertSimple(
  athletes: Athlete[],
  countries: Country[]
): [AthleteDisplay[], number] {
  const start = performance.now();
  const athleteDisplays: AthleteDisplay[] = athletes.map(athlete => {
    return {
      countryName: countries.find(country => country.id === athlete.countryId)
        .name,
      name: athlete.name
    };
  });
  const end = performance.now();
  return [athleteDisplays, end - start];
}

export function convertEntity(
  athletes: Athlete[],
  countries: Country[]
): [AthleteDisplay[], number, number] {
  const start = performance.now();
  const countryDictionary = keyBy(countries, 'id');
  const middle = performance.now();
  const athleteDisplays: AthleteDisplay[] = athletes.map(athlete => {
    return {
      countryName: countryDictionary[athlete.countryId].name,
      name: athlete.name
    };
  });
  const end = performance.now();
  return [athleteDisplays, middle - start, end - middle];
}
