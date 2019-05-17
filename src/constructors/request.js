// import find-user helper function
var findUser = require("../../helpers/find-user");
// import assign-id function
var assignId = require("../../helpers/assign-id");
// import assign-id helper function
var findBook = require("../../helpers/find-book");
// import book
var Book = require("../constructors/book");
// import users
var User = require("../constructors/user");
// import database
var db = require("../../database");
// import find-request
var findRequest = require("../../helpers/find-request");

// request constructor
function Request(bookId, userId) {
  this.id = assignId("request");
  this.bookId = bookId;
  this.userId = userId;
  this.status = 0;
}

// create request method
Request.prototype.create = function() {
  // check if user, book exist
  if (!findUser(this.userId) || !findBook(this.bookId)) {
    // return false for book/user do not exist
    return false;
  }
  //   check if book is available
  if (findBook(this.bookId).quantity === 0) {
    // if not available, return book taken
    return "book taken";
  }

  return db.request.push(this);
};

// read method
Request.prototype.read = function(id) {
  // return false if id is undefind
  if (!id) {
    return false;
  }
  // return the request when found, else return false
  return findRequest(id);
};

// update method
Request.prototype.update = function(data, id) {
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

// delete request method
Request.prototype.delete = function (id) {
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
}
// create book
// var book1 = new Book("new school", "physics", "Gandi bi", 1);
// book1.create();
// // create another book
// var book2 = new Book("new school chemistry", "chemistry", "Gandi bi", 1);
// book2.create();
// // create user
// var student = new User("joe", "pass", 3);
// student.create();
// // request obj
// var req1 = new Request(1, 1);
// console.log(req1.create());
// req1.update({bookId: 2}, 1);
// req1.delete(3);
// console.log(req1.read(1));

console.log(db.request);

// export Request constructor
module.exports = Request;
