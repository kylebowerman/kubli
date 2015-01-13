db.kubli.aggregate([{
  $group: {
    _id: "$device",
    avgValue: {
      $avg: "$value"
    }
  }
}]);
