// import user constructor
var User = require("./user");
// import assign id function
var assignId = require("../../helpers/assignId");
// import getAllRequest helper function
var getAllRequest = require("../../helpers/getAllRequest");
// import find request
var findRequest = require("../../helpers/findRequest");
// import database
var db = require("../../database");
// import findBook function
var findBook = require("../../helpers/findBook");

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
  // get all request sorted by priority
  var sortedBookRequest = getAllRequest();
  // loop through the array for same book request
  for (index = 0; index < sortedBookRequest.length; index++) {
    // get book to access quantity in stock
    var bookQuantity = findBook(sortedBookRequest[index].bookId);
    // check if book is out of stock
    if (bookQuantity.quantity === 0) {
      // book is oout of stock, current request status set to book taken
      sortedBookRequest[index].status = 'book taken';
    } else {
      // approve
      sortedBookRequest[index].status = 'Approved';
      // deduct one from the book
      bookQuantity.quantity =  bookQuantity.quantity - 1;
    }
  }
  // return true after approval
  return true;
};

// delete single book request by id
Admin.prototype.deleteBookRequest = function(id) {
  // check if id is not defined
  if (!id) {
    return false;
  }
  if (!findRequest(id)) {
    return false;
  }
  // get all request
  var allRequest = getAllRequest();
  // loop over all request to find by id
  for (var index = 0; index < allRequest.length; index++) {
    if (allRequest[index].id === id) {
      return allRequest.splice(index, 1);
    }
  }
};

// delete all request by admin
Admin.prototype.deleteAllBookRequest = function() {
  var deleteALlRequest = (db.request.length = 0);
  return deleteALlRequest;
};

// export Admin constructor
module.exports = Admin;
