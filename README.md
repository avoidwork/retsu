# retsu

Retsu is an Array library for Client or Server, focused on speed & providing useful functions.

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

#### compact(obj[, diff])
Compacts a Array by removing `null` or `undefined` indices; returns `null` if `diff` is `true` and there is no difference

#### count(obj, arg)
Counts the occurrence of `arg` in `obj`

#### diff(obj1, obj2)
Finds the difference between two Arrays

#### each(obj, fn[, ctx])
Iterates `obj` and executes `fn` with arguments [`value`, `index`]; returning `false` from `fn` halts iteration

#### empty(obj)
Determines if an Array is empty

#### equal(obj1, obj2)
Determines if two Arrays are equal

#### fill(obj, arg[, start, offset])
Fills `obj` with the evalution of `arg`, optionally from `start` to `offset`

#### flat(obj)
Flattens a 2D Array

#### intersect(obj1, obj2)
Finds the intersections between two Arrays

#### iterate(obj, fn)
Iterates an Array using an Iterator

#### iterator(obj)
Creates an Array generator to iterate the indices

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

#### remove(obj, start, end)
Removes indices from an Array without recreating it

#### replace(obj1, obj2)
Replaces the contents of `obj1` with `obj2`

#### series(start, end[, offset])
Generates a series Array

#### sort()
Sorts the Array by parsing values, to be used with `[].sort()`

#### sorted(obj)
Sorts `obj` using `sort`

#### spread(obj, arg)
Spreads an Array by divisor `arg`, e.g. `retsu.spread(new Array(100), 21)`

#### stddev(obj)
Finds the standard deviation of an Array

#### sum(obj)
Gets the summation of an Array

#### unique(obj)
Returns an Array of unique indices of `obj`

#### variance(obj)
Finds the variance of an Array

## License
Copyright (c) 2017 Jason Mulligan
Licensed under the BSD-3 license.
