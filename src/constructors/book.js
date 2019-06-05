// import assign id function
import assignId from "../../helpers/assignId";
// let assignId = require("../../helpers/assignId");
// import book
import findBook from "../../helpers/findBook";
// let findBook = require("../../helpers/findBook");
// import db
import db from "../../database";
// let db = require("../../database");

// books class
class Book {
  constructor(title, category, author, quantity) {
    this.id = assignId("books");
    this.title = title;
    this.category = category;
    this.author = author;
    this.quantity = quantity;
  }

  // create book mehtod
  createBook() {
    // add new book record to database
    return db.books.push(this);
  }
  // read book
  readBook(id) {
    return findBook(id);
  };
  // update method
  updateBook(data, id) {
    let book = findBook(id);
    if (book) {
      book.title = data.title;
      book.category = data.category;
      book.author = data.author;
      book.quantity = data.quantity;
      return true;
    } else {
      return false;
    }
  };
  // delete book method by Id
  deleteBook(id) {
    // return false if id is undefined
    if (!id) {
      return false;
    }
    // loop throuh array of book and remove the item that match the give id
    for (let index = 0; index < db.books.length; index++) {
      if (db.books[index].id === id) {
        return db.books.splice(index, 1);
      }
    }
    return false;
  };
  // search book method by title
 searchBook(bookTitle) {
    // return false if book title is undefined
    if (!bookTitle || typeof bookTitle === "number") {
      return false;
    }
    // regex pattern to check with book title
    let pattern = new RegExp(bookTitle, "g");
    // empty array to store match found
    let foundTitle = [];
    // loop through book array, return all booktitle match
    for (let index = 0; index < db.books.length; index++) {
      // check for match with the regex pattern
      if (db.books[index].title.match(pattern)) {
        // store match result to
        foundTitle.push(db.books[index]);
      }
    }
    return foundTitle;
  };
}


// export book constructor
export default Book;
