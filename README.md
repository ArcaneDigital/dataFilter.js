# dataFilter.js
Filter and sort elements using data attributes

## Examples
    dataFilter.init({
         filterclass: 'filter',
         dataParent: 'dataParent',
         sortAttr: 'data-sort'
    });

## Documentation

`dataFilter.init(options)`

### Options
- `filterClass` the class used on buttons or links that are used to filter the data
- `dataParent` the ID of the parent element which contains the data to filter
- `sortAttr` the data attribute that is used to sort the items
