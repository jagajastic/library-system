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
var findRequest = require('../../helpers/find-request');

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
Request.prototype.read = function (id) {
  // return false if id is undefind
  if (!id){
    return false;
  }
// return the request when found, else return false
  return findRequest(id);
}
// create book
// var book1 = new Book("new school", "physics", "Gandi bi", 1);
// book1.create();
// // create user
// var student = new User("joe", "pass", 3);
// student.create();
// // request obj
// var req1 = new Request(1, 1);
// console.log(req1.create());
// console.log(req1.read(1));
// console.log(db);

// export Request constructor
module.exports = Request;
