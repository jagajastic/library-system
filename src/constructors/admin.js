// import user constructor
var User = require("./user");
// import Request constructor
var Request = require("./request");
// import assign id function
var assignId = require("../../helpers/assign-id");
// import getAllRequest helper function
var getAllRequest = require("../../helpers/get-all-request");

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
  // get all book request sorted by priority
  return getAllRequest();
};

// var admin = new Admin("admin", "amdin", 0);
// console.log(getAllRequest());
// export Admin constructor
module.exports = Admin;
