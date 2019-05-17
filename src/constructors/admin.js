// import user constructor
var User = require("./user");
// import Request constructor
var Request = require("./request");
// import assign id function
var assignId = require("../../helpers/assign-id");

// Admin constructor
function Admin(username, password) {
  this.id = assignId("admin");
  this.username = username;
  this.password = password;
}

// Inherit request method
Admin.prototype = Object.create(User.prototype);
// re-assign Admin connstructor
Admin.prototype.constructor = Admin;

// export Admin constructor
module.exports = Admin;
