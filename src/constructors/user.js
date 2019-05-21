// import assign-id method
var assignId = require('../../helpers/assignId');
// import database
var db = require('../../database');
// import find user function
var findUser = require('../../helpers/findUser');
//  import request constructor
var Request = require('../constructors/request');

// User constructor
function User(username, password, priority) {
  this.id = assignId('users');
  this.username = username;
  this.password = password;
  this.priority = priority;
}

// User create methods
User.prototype.createUser = function() {
  return db.users.push(this);
};

/**
 * read user method
 * loop through user array
 * return users
 */
User.prototype.readUser = function(id) {
  // return false if id is undefined
  if (!id) {
    // return false since id is undefined
    return false;
  }
  return findUser(id);
};

// update user infomation when found, else return false
User.prototype.updateUser = function(data, id) {
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

User.prototype.deleteUser = function(id) {
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
  var req1 = new Request(data.bookId, data.userId, data.userPriority);
  var result = req1.createBookRequest();
  // return the created request if userId and bookId is correct else return false
  return result;
};

// read book requestion by id
User.prototype.readBookRequest = function(id) {
  // instantiate the request(object)
  var req1 = new Request(1, 1, 3);
  // return result of read whether false or true
  return req1.readBookRequest(id);
};

// export user constructor
module.exports = User;
