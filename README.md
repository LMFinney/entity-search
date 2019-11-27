# entity-search

Demo app to show the performance of the entity pattern for search relative to using
[Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
to search an array.

## Installation

Run `npm install` (or `yarn`) to install the dependencies.

## Execution

Run `npm run start` (or `yarn start`) to run the script.

The script creates country objects with an id and athlete objects that have a reference to the id of the
relevant country. Once the objects are created, the script demonstrates two ways to connect the athletes
with their countries to display the athlete names and country names together.

### Simple

Simple iterates through each Athlete in the Athletes array, and it uses the
[Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
function over the countries array to find the relevant Country object for each athlete by the
country id.

This approach is simple, but it does not scale well.

### Entity

Entity uses the pattern from [@ngrx/entity](https://ngrx.io/guide/entity): instead of leaving the
Countries in an array, it creates an object that uses the id of each Country as the key and the
Country object itself as the property. The advantage of this is that getting the Country by id using
property access is extremely quick, and the find time is independent of the size of the object.

The disadvantage of this approach is that we need to take the extra step at the beginning of
creating the entity object from the array. For small arrays/objects, the extra conversion time
dominates, but it is nearly irrelevant for large arrays/objects.

## Output

The application creates an array of four countries and five athletes, uses both approaches to
associate each athlete with its country, and then displays a table with the athlete names and
country names. Additionally, it shows the execution time for each approach. Generally, the execution
time for the entity approach is slower for this size of problem.

Then, the application uses [faker.js](https://www.npmjs.com/package/faker) to create fake athletes
and countries, uses both approaches to associate them, and then shows the result. Below is a typical
resulting table (because there is randomness in the data, each run has different runtimes, but the
the overall trend is consistent):

| (index) | countries | Array.find() | total time w/ entity | building the entity map | searching with entity |
| ------- | --------- | ------------ | -------------------- | ----------------------- | --------------------- |
| 0       | 1         | 0.288        | 0.226                | 0.023                   | 0.203                 |
| 1       | 10        | 0.570        | 0.486                | 0.036                   | 0.450                 |
| 2       | 100       | 1.546        | 0.176                | 0.024                   | 0.151                 |
| 3       | 1000      | 0.884        | 0.378                | 0.061                   | 0.317                 |
| 4       | 10000     | 10.926       | 0.765                | 0.679                   | 0.086                 |
| 5       | 100000    | 275.371      | 6.527                | 6.381                   | 0.146                 |

In building the table, the application creates 1000 Athletes and associates them with a different
number of randomly-assigned countries: 1, 10, 100, etc.

For 1 and 10 countries, using the simple approach takes roughly the same amount of time. For 100,
1000, and 10000 countries, the entity approach is starting to be a bit faster; by the 10000-country
run, the total running time for the entity approach is roughly 13 times less than for the simple
approach. For the 100000 country run, the simple approach is about 40 times slower.

The lesson is that the entity approach scales significantly better than the simple approach: it's a
_O(1)_ comparison instead of a _O(n)_ comparison, and that pays huge dividends for large data sets.
