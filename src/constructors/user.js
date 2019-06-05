// import assign-id method
// let assignId = require('../../helpers/assignId');
import assignId from "../../helpers/assignId";
// import database
import db from "../../database";
// let db = require('../../database');
// import find user function
import findUser from "../../helpers/findUser";
// let findUser = require('../../helpers/findUser');
//  import request constructor
import Request from "../constructors/request";
// let Request = require('../constructors/request');

// User class
class User {
  constructor(username, password, priority) {
    this.id = assignId("users");
    this.username = username;
    this.password = password;
    this.priority = priority;
  }

  // User create methods
   createUser() {
    // check to ensure user created is not Admin
    if (this.priority === 4) {
      return false;
    }
    return db.users.push(this);
  }
  /**
   * read user method
   * loop through user array
   * return users
   */
  readUser(id) {
    // return false if id is undefined
    if (!id) {
      // return false since id is undefined
      return false;
    }
    return findUser(id);
  };
  // update user infomation when found, else return false
  updateUser(data, id) {
    // find user, if found return else return false
    let user = findUser(id);
    if (user) {
      // update each field in found user
      (user.username = data.username),
        (user.password = data.password),
        (user.priority = data.priority);
    }
    // return false cause user not found
    return user;
  };
  deleteUser(id) {
    // return false when id is empty
    if (!id) {
      return false;
    }
    // loop  through array
    for (let index = 0; index < db.users.length; index++) {
      // remove the found user from the array using splice
      if (db.users[index].id === id) return db.users.splice(index, 1);
    }
    // return false when user is not found;
    return false;
  };
  // create request method
  createBookRequest(data) {
    // instantiate the request
    let req1 = new Request(data.bookId, data.userId, data.userPriority);
    let result = req1.createBookRequest();
    // return the created request if userId and bookId is correct else return false
    return result;
  };
  // read book requestion by id
  readBookRequest(id) {
    // instantiate the request(object)
    let req1 = new Request(1, 1, 3);
    // return result of read whether false or true
    return req1.readBookRequest(id);
  };
}

// export user constructor
export default User;
