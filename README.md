# retsu

Retsu is an Array library for Client or Server, focused on providing useful functions, and speed.
It implements popular Array methods from Ruby.

[![build status](https://secure.travis-ci.org/avoidwork/retsu.svg)](http://travis-ci.org/avoidwork/retsu)

## API
#### add(obj, arg)
Adds `arg` to `obj` if it is not found in `obj`

#### binIndex(obj, arg)
Performs a binary search on `obj` (must be sorted) for `arg`

#### cast(obj[, keys])
Returns an Object ( NodeList, etc. ) as an Array; if `keys` is true you will get the keys of the Object

#### chunk(obj, size)
Transforms an Array to a 2D Array of chunks

#### clear(obj)
Clears an Array without destroying it

#### clone(obj)
Clones an Array, `shallow` defaults to `true`

#### contains(obj, arg)
Determines if `obj` contains `arg`

#### collect(obj, fn)
Creates a new Array of the result of `fn` executed against every index of `obj`

#### compact(obj[, diff])
Compacts a Array by removing `null` or `undefined` indices; returns `null` if `diff` is `true` and there is no difference

#### count(obj, arg)
Counts the occurrence of `arg` in `obj`

#### diff(obj1, obj2)
Finds the difference between two Arrays

#### each(obj, fn[, ctx])
Iterates `obj` and executes `fn` with arguments [`value`, `index`]; returning `false` from `fn` halts iteration

#### eachAsync(obj, fn[, async, size, ctx])
Iterates `obj` and executes `fn` with arguments [`value`, `index`]; returning `false` from `fn` halts iteration

#### eachReverse(obj, fn[, ctx])
Like `each()`, but in reverse

#### eachAsyncReverse(obj, fn[, async, size, ctx])
Like `eachAsync()`, but in reverse

#### empty(obj)
Determines if an Array is empty

#### equal(obj1, obj2)
Determines if two Arrays are equal

#### fill(obj, arg[, start, offset])
Fills `obj` with the evalution of `arg`, optionally from `start` to `offset`

#### first(obj)
Returns the first index

#### flat(obj)
Flattens a 2D Array

#### forEach(obj, fn[, ctx])
Like `each()`, iterates `obj` and executes `fn` with arguments [`value`, `index`]; returning `false` from `fn` halts iteration

#### fromObject(obj)
Creates a 2D Array from an Object

#### index(obj, arg)
Facade of `indexOf()`

#### indexed(obj)
Returns an Associative Array as an Indexed Array

#### intersect(obj1, obj2)
Finds the intersections between two Arrays

#### iterate(obj, fn)
Iterates an Array using an Iterator

#### iterator(obj)
Creates an Array generator to iterate the indices

#### keepIf(obj, fn)
Resizes `obj` by keeping every index which `fn` evaluates to `true`

#### last(obj[, offset])
Returns the last index of the Array, with an optional `offset` from the end to retrieve a range

#### limit(obj, start, offset)
Returns a limited range of indices from the Array

#### max(obj)
Finds the maximum value in an Array

#### mean(obj)
Finds the mean of an Array

#### median(obj)
Finds the median value of an Array

#### merge(obj1, obj2)
Merges `obj2` into `obj1`, excluding duplicate indices

#### min(obj)
Finds the minimum value in an Array

#### mingle(obj1, obj2)
Mingles Arrays and returns a 2D Array, corresponding index positions are paired

#### mode(obj)
Finds the mode value of an Array

#### range(obj)
Finds the range of the Array

#### rassoc(obj, arg)
Searches a 2D Array `obj` for the first match of `arg` as a second index

#### reject(obj, fn)
Returns Array containing the items in `obj` for which `fn` is not true

#### remove(obj, start, end)
Removes indices from an Array without recreating it

#### removeIf(obj, fn)
Deletes every index of `obj` for which `fn` evaluates to true

#### removeWhile(obj, fn)
Deletes indices of `obj` until `fn` evaluates to false

#### replace(obj1, obj2)
Replaces the contents of `obj1` with `obj2`

#### rest(obj[, offset])
Returns the "rest" of `obj`, `offset` defaults to 1

#### rindex(obj, arg)
Finds the last index of `arg` in `obj`

#### rotate(obj, arg)
Returns new Array with `arg` moved to the first index

#### series(start, end[, offset])
Generates a series Array

#### sort()
Sorts the Array by parsing values, to be used with `[].sort()`

#### sorted(obj)
Sorts `obj` using `sort`

#### split(obj, arg)
Splits an Array by divisor `arg`, e.g. `retsu.split(new Array(100), 21)`

#### stddev(obj)
Finds the standard deviation of an Array

#### sum(obj)
Gets the summation of an Array

#### take(obj, n)
Takes the first `n` indices from `obj`

#### toObject(obj)
Casts an Array to Object

#### total(obj)
Gets the total keys in an Array

#### unique(obj)
Returns an Array of unique indices of `obj`

#### variance(obj)
Finds the variance of an Array

#### zip(obj, args)
Converts `args` to Array, then merges elements of `obj` with corresponding elements from each argument
