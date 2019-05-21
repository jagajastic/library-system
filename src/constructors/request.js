// import find-user helper function
var findUser = require('../../helpers/find-user');
// import assign-id function
var assignId = require('../../helpers/assign-id');
// import assign-id helper function
var findBook = require('../../helpers/find-book');
// import database
var db = require('../../database');
// import find-request
var findRequest = require('../../helpers/find-request');

// request constructor
function Request(bookId, userId, userPriority) {
  this.id = assignId('request');
  this.bookId = bookId;
  this.userId = userId;
  this.userPriority = userPriority;
  this.status = 'pending';
}

// create book request method
Request.prototype.createBookRequest = function() {
  // check if user, book exist
  if (!findUser(this.userId) || !findBook(this.bookId) || !this.userPriority) {
    // return false for book/user do not exist
    return false;
  }
  //   check if book is available
  if (findBook(this.bookId).quantity === 0) {
    // if not available, return book taken
    return 'book taken';
  }

  return db.request.push(this);
};

// read book request method by id
Request.prototype.readBookRequest = function(id) {
  // return false if id is undefind
  if (!id || id === undefined || id === null) {
    return false;
  }
  // return the request when found, else return false
  return findRequest(id);
};

// update method by id and data to change the existing one
Request.prototype.updateBookRequest = function(data, id) {
  // check if id is undefined
  if (!id) {
    return false;
  }
  var request = findRequest(id);
  if (request) {
    // change the value of the bookId,
    request.bookId = data.bookId;
    // return true after updating
    return true;
  }
  // return false if request not found
  return request;
};

// delete request method by id
Request.prototype.deleteBookRequest = function(id) {
  // return false when id is empty
  if (!id) {
    return false;
  }
  // loop  through array
  for (var index = 0; index < db.request.length; index++) {
    // remove the found request from the array using splice
    if (db.request[index].id === id) return db.request.splice(index, 1);
  }
  // return false when request is not found;
  return false;
};

// export Request constructor
module.exports = Request;
