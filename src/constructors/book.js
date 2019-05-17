// import assign id function
var assignId = require("../../helpers/assign-id");
// import book
var findBook = require("../../helpers/find-book");
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
Book.prototype.create = function() {
  // add new book record to database
  return db.books.push(this);
};

// read book
Book.prototype.read = function(id) {
  return findBook(id);
};

// update method
Book.prototype.update = function(data, id) {
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
  console.log(db.books);
};

Book.prototype.delete = function(id) {
  // return false if id is undefined
  if (!id) {
    return false;
  }
  //loop throuh array of book and remove the item that match the give id
  for (var index = 0; index < db.books.length; index++) {
    if (db.books[index].id === id) {
      return db.books.splice(index, 1);
    }
  }
  return false;
};
// var book1 = new Book('new school', 'maths', 'Gandi Bi', 3);
// book1.create();
// var book2 = new Book('new school', 'maths', 'Gandi Bi', 3);
// book2.create();
// console.log(book1.read(90));
// console.log(book1.update({title: 'unew', category: 'umath', author: 'uauhtor', quantity: 5}, 12));
// book1.delete(1);
// console.log(db.books);
// export book constructor
module.exports = Book;
