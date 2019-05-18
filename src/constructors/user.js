// import assign-id method
var assignId = require("../../helpers/assign-id");
// import database
var db = require("../../database");
// import find user function
var findUser = require("../../helpers/find-user");
//  import request constructor
var Request = require("../constructors/request");
// import find-request
var findRequest = require('../../helpers/find-request');
// import book
var Book = require('../constructors/book');

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
  // return false if id is undefined
  if (!id) {
    // return false since id is undefined
    return false;
  }
  return findUser(id);
};

// update user infomation when found, else return false
User.prototype.update = function(data, id) {
  // find user, if found return else return false
  var user = findUser(id);
  if (user) {
    // update each field in found user
    (user.username = data.username),
      (user.password = data.password),
      (user.priority = data.priority);
  }
  // return false cause user not found
  return user;
};

User.prototype.delete = function(id) {
  // return false when id is empty
  if (!id) {
    return false;
  }
  // loop  through array
  for (var index = 0; index < db.users.length; index++) {
    // remove the found user from the array using splice
    if (db.users[index].id === id) return db.users.splice(index, 1);
  }
  // return false when user is not found;
  return false;
};

// create request method
User.prototype.createBookRequest = function(data) {
  // instantiate the request
  var req1 = new Request(data.bookId, data.userId);
  var result = req1.create();
  // console.log(result);
  // return the created request if userId and bookId is correct else return false
  return result;
};

// read book requestion 
User.prototype.readBookRequest = function (id) {
  // instantiate the request(object)
  var req1 = new Request(1, 1);
  // return result of read whether false or true
  return req1.read(id);
}
// var user1 = new User("joe", "pass", 3);
// user1.create();
// console.log(db.users);
// console.log(
//   user1.update({ username: "uuser", password: "upass", priority: 1 }, 1)
// );
// var book1 = new Book("text book", "math", "authur", 4);
// book1.create();
// user1.createBookRequest({ bookId: 1, userId: 1 });
// // user1.readBookRequest(1)
// console.log(db.request)
// console.log(user1.delete(1));
// export user constructor
module.exports = User;
