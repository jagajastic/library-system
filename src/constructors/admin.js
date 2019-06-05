// import user constructor
import User from './user';
// let User = require("./user");
// import assign id function
import assignId from '../../helpers/assignId';
// let assignId = require("../../helpers/assignId");
// import getAllRequest helper function
import getAllRequest from '../../helpers/getAllRequest';
// let getAllRequest = require("../../helpers/getAllRequest");
// import find request
import findRequest from '../../helpers/findRequest';
// let findRequest = require("../../helpers/findRequest");
// import database
import db from '../../database';
// let db = require("../../database");
// import findBook function
import findBook from '../../helpers/findBook';
// let findBook = require("../../helpers/findBook");

// Admin class 
class Admin extends User{
  constructor(username, password, priority) {
    super(username, password, priority);
    this.id = assignId("users");
  }
  
  // create admin account
  createAdmin() {
    // chekcto ensure that is admin creation
    if (this.priority !== 4) {
      return false;
    }
    // save the admin to database
    return db.users.push(this);
  };

  // approve book request method
  approveBookRequest() {
    // check if not admin
    if (this.priority !== 4) {
      return false;
    }
    // get all request sorted by priority
    let sortedBookRequest = getAllRequest();
    // loop through the array for same book request
    for (let index = 0; index < sortedBookRequest.length; index++) {
      // get book to access quantity in stock
      let bookQuantity = findBook(sortedBookRequest[index].bookId);
      // check if book is out of stock
      if (bookQuantity.quantity === 0) {
        // book is oout of stock, current request status set to book taken
        sortedBookRequest[index].status = "book taken";
      } else {
        // approve
        sortedBookRequest[index].status = "Approved";
        // deduct one from the book
        bookQuantity.quantity = bookQuantity.quantity - 1;
      }
    }
    // return true after approval
    return true;
  };
  // delete single book request by id
 deleteBookRequest(id) {
    // check if id is not defined
    if (!id) {
      return false;
    }
    if (!findRequest(id)) {
      return false;
    }
    // get all request
    let allRequest = getAllRequest();
    // loop over all request to find by id
    for (let index = 0; index < allRequest.length; index++) {
      if (allRequest[index].id === id) {
        return allRequest.splice(index, 1);
      }
    }
  };
  // delete all request by admin
  deleteAllBookRequest() {
    let deleteALlRequest = (db.request.length = 0);
    return deleteALlRequest;
  };
}

// export Admin class
export default Admin;
