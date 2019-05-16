// import assign-id method
var assignId = require("../../helpers/assign-id");

//User constructor
function User(username, password, priority) {
  this.id = assignId("user");
  this.username = username;
  this.password = password;
  this.priority = priority;
}

// export user constructor
module.exports = User;
