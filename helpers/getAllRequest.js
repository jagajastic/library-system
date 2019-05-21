// import db
var db = require('../database');

// get all request sorted by priority from db based
function getAllRequest() {
  // sorted array by priority
  return  db.request.sort(function(a, b) {
    return a.userPriority - b.userPriority;
  });
}

// export getAllRequest function
module.exports = getAllRequest;
