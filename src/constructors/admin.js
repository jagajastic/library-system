// import user constructor
var User = require("./user");
// import Request constructor
var Request = require("./request");
// import assign id function
var assignId = require("../../helpers/assign-id");

// Admin constructor
function Admin(username, password, priority) {
  User.call(this, username, password, priority);
  this.id = assignId("admin");
}

// Inherit request method
Admin.prototype = Object.create(User.prototype);
// re-assign Admin connstructor to Admin
Admin.prototype.constructor = Admin;

var admin = new Admin("admin", "amdin", 0);
console.log(admin);
// export Admin constructor
module.exports = Admin;
