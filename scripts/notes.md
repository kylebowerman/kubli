


## Mongo aggregate functions


*get the average value for each pin*

```javascript
db.kubli.aggregate([{$group:{_id: "$device",avgValue:{$avg: "$value"}}}]);
```

```json
{ "_id" : "light", "avgValue" : 282.0423529411765 }
{ "_id" : "moisture", "avgValue" : 776.9423529411765 }
```

*get the max value for each pin*

```javascript
db.kubli.aggregate([{$group:{_id: "$device",maxValue:{$max: "$value"}}}]);
```

```json
{ "_id" : "light", "maxValue" : 934 }
{ "_id" : "moisture", "maxValue" : 823 }
```

***get the average per hour per day*** From [here](https://dbamohsin.wordpress.com/2014/11/25/mongodb-exception-cant-convert-from-bson-type-string-to-date/)

```js
db.kubli.aggregate([{
  $group: {
    _id: {
      device: "$device",
      month : { $substr : ["$time", 5, 2 ] },
      day: { $substr: ["$time", 8,2]},
      hour: { $substr: ["$time", 11,2]}

    },
    avgValue: {
      $avg: "$value"
    }
  }
}]);

```
