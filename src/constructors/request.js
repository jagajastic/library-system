// import find-user helper function
import findUser from '../../helpers/findUser'
// let findUser = require('../../helpers/findUser');
// import assign-id function
import assignId from '../../helpers/assignId';
// let assignId = require('../../helpers/assignId');
// import assign-id helper function
import findBook from '../../helpers/findBook'
// let findBook = require('../../helpers/findBook');
// import database
import db from '../../database';
// let db = require('../../database');
// import find-request
import findRequest from '../../helpers/findRequest';
// let findRequest = require('../../helpers/findRequest');

// request class
class Request{
  constructor(bookId, userId, userPriority) {
    this.id = assignId('request');
    this.bookId = bookId;
    this.userId = userId;
    this.userPriority = userPriority;
    this.status = 'pending';
  }

  // create book request method
  createBookRequest() {
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
  readBookRequest(id) {
    // return false if id is undefind
    if (!id || id === undefined || id === null) {
      return false;
    }
    // return the request when found, else return false
    return findRequest(id);
  };
  // update method by id and data to change the existing one
  updateBookRequest(data, id) {
    // check if id is undefined
    if (!id) {
      return false;
    }
    let request = findRequest(id);
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
  deleteBookRequest(id) {
    // return false when id is empty
    if (!id) {
      return false;
    }
    // loop  through array
    for (let index = 0; index < db.request.length; index++) {
      // remove the found request from the array using splice
      if (db.request[index].id === id) return db.request.splice(index, 1);
    }
    // return false when request is not found;
    return false;
  };
}

// export Request constructor
export default Request;
