// import db
var db = require("../database");

// get all request sorted by priority from db based
function getAllRequest() {
  // sorted array by priority
  var sortedBookRequest = db.request.sort(function(a, b) {
    return a.userPriority - b.userPriority;
  });
  // loop through the array for same book request
  for (index = 0; index < sortedBookRequest.length; index++) {
    sortedBookRequest[index].status = "Approved";
  }
  //give the one with higher priority
  //give other based on priority
  return true;
}

// import getAllRequest function
module.exports = getAllRequest;
