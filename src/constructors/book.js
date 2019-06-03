// import assign id function
var assignId = require("../../helpers/assignId");
// import book
var findBook = require("../../helpers/findBook");
// import db
var db = require("../../database");

// books
function Book(title, category, author, quantity) {
  this.id = assignId("books");
  this.title = title;
  this.category = category;
  this.author = author;
  this.quantity = quantity;
}

// create book mehtod
Book.prototype.createBook = function() {
  // add new book record to database
  return db.books.push(this);
};

// read book
Book.prototype.readBook = function(id) {
  return findBook(id);
};

// update method
Book.prototype.updateBook = function(data, id) {
  var book = findBook(id);
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
Book.prototype.deleteBook = function(id) {
  // return false if id is undefined
  if (!id) {
    return false;
  }
  // loop throuh array of book and remove the item that match the give id
  for (var index = 0; index < db.books.length; index++) {
    if (db.books[index].id === id) {
      return db.books.splice(index, 1);
    }
  }
  return false;
};

// search book method by title
Book.prototype.searchBook = function(bookTitle) {
  // return false if book title is undefined
  if (!bookTitle || typeof bookTitle === "number") {
    return false;
  }
  // regex pattern to check with book title
  var pattern = new RegExp(bookTitle, "g");
  // empty array to store match found
  var foundTitle = [];
  // loop through book array, return all booktitle match
  for (var index = 0; index < db.books.length; index++) {
    // check for match with the regex pattern
    if (db.books[index].title.match(pattern)) {
      // store match result to
      foundTitle.push(db.books[index]);
    }
  }
  return foundTitle;
};

// export book constructor
module.exports = Book;
