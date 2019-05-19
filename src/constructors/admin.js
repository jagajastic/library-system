// import user constructor
var User = require("./user");
// import assign id function
var assignId = require("../../helpers/assign-id");
// import getAllRequest helper function
var getAllRequest = require("../../helpers/get-all-request");
// import find request
var findRequest = require('../../helpers/find-request');
// import database
var db = require('../../database');

// Admin constructor
function Admin(username, password, priority) {
  User.call(this, username, password, priority);
  this.id = assignId("users");
}

// Inherit request method
Admin.prototype = Object.create(User.prototype);
// re-assign Admin connstructor to Admin
Admin.prototype.constructor = Admin;

// approve book request method
Admin.prototype.approveBookRequest = function() {
  // check if not admin
  if (this.priority !== 4) {
    return false;
  }
  // get all request sorted by priority
  var sortedBookRequest = getAllRequest();
  // loop through the array for same book request
  for (index = 0; index < sortedBookRequest.length; index++) {
    sortedBookRequest[index].status = "Approved";
  }
  // return true after approval
  return true;
};

// delete single request method
Admin.prototype.delete = function(id) {
  // check if id is not defined
  if (!id) {
    return false;
  }
  // console.log(findRequest(id));
  
  if (!findRequest(id)) {
    return false;
  }
  // get all request
  var allRequest = getAllRequest();
  // loop over all request to find by id
  for (var index = 0; index < allRequest.length; index++) {
    if (allRequest[index].id === id) {
      return allRequest.splice(index, 1);
    }
  }
};

// delete all request by admin
Admin.prototype.deleteAll = function () {
var deleteALlRequest = db.request.length = 0
  return deleteALlRequest;
}

// export Admin constructor
module.exports = Admin;
