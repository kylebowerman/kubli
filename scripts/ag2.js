DBQuery.shellBatchSize = 300;
db.kubli.aggregate([

{$match: {"device": "moisture"}},
{ $group: {
    _id: {
      device: "$device",
      year: {
        $substr: ["$time", 0, 4]
      },
      month: {
        $substr: ["$time", 5, 2]
      },
      day: {
        $substr: ["$time", 8, 2]
      }
    },
    avgValue: {
      $avg: "$value"
    }
  }
},
{$sort: {"day": 1}},

]);
