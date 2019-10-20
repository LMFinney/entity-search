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
and countries, uses both approaches to associate them, and then shows the result. Below is one
resulting table (because there is randomness in the data, each run has different runtimes, but the
the overall trend is consistent):

| (index) | length | simple    | building the entity map | searching with entity | total time w/ entity |
| ------- | ------ | --------- | ----------------------- | --------------------- | -------------------- |
| 0       | 1      | 0.01      | 0.037                   | 0.014                 | 0.051                |
| 1       | 10     | 0.007     | 0.013                   | 0.003                 | 0.016                |
| 2       | 100    | 0.252     | 0.029                   | 0.012                 | 0.040                |
| 3       | 1000   | 16.154    | 0.566                   | 0.398                 | 0.964                |
| 4       | 10000  | 251.483   | 3.239                   | 2.628                 | 5.868                |
| 5       | 100000 | 12576.082 | 8.896                   | 44.044                | 52.939               |

In building the table, the application first creates an Athletes array with one value and associates it with one
country. Next, it creates arrays with 10 values and associates them, then 100 values, etc.

For 1 and 10 elements, using the simple approach is quicker, largely because the startup time to
build the map overwhelms the time of the actual search. For 100, 1000, and 10000 elements, building
the map for the entity approach takes more time than actually searching using it, but the search is
so quick that the initial startup time is worth it; by the 10000-element run, the total running time
for the entity approach is roughly 40 times less than for the simple approach. For the 100000
element run, the simple approach is over 350 times slower.

The lesson is that the entity approach scales significantly better than the simple approach: it's a
*O(1)* comparison instead of a *O(n)* comparison, and that pays huge dividends for large data sets.