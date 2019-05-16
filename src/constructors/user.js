// import assign-id method
var assignId = require("../../helpers/assign-id");
// import database
var db = require("../../database");
// import find user function
var findUser = require("../../helpers/find-user");

//User constructor
function User(username, password, priority) {
  this.id = assignId("users");
  this.username = username;
  this.password = password;
  this.priority = priority;
}

// User create methods
User.prototype.create = function() {
  return db.users.push(this);
};

/**
 * read user method
 * loop through user array
 * return users
 */
User.prototype.read = function(id) {
  return findUser(id);
};

User.prototype.update = function(data, id) {
  var user = findUser(id);
  if (user) {
    user.username = data.username,
    user.password = data.password,
    user.priority = data.priority
  }else { return user}
};
// var user1 = new User("joe", "pass", 3);
// user1.create();
// console.log(db.users);
// console.log(user1.update({username : 'uuser', password: 'upass', priority: 1}, 10));
// console.log(db.users);
// export user constructor
module.exports = User;
