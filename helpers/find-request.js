// import database
var db = require("../database");

function findRequest(id) {
  // return false if id is undefined
  if (!id) {
    return false;
  }
  // start of the array
  var start = 0;
  // end of the array
  var end = db.request.length - 1;
  // middle of the array
  var middle = Math.floor((start + end) / 2);
  while (db.request[middle].id !== id && start <= end) {
    // check if id is less than the middle item id and reassign end to (middle -1)
    if (id < db.request[middle].id) end = middle - 1;
    // assign middle +1 to start
    else start = middle + 1;
    // define new middle
    middle = Math.floor((start + end) / 2);
  }
  // return the user if id is eqaul else return false
  return db.request[middle].id === id ? db.request[middle] : false;
}

// export findRequest method
module.exports = findRequest;
