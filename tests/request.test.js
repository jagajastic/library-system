// import book
var Book = require("../src/constructors/book");
// import user
var User = require("../src/constructors/user");
// import request
var Request = require("../src/constructors/request");
// import database
var db = require("../database");

// create book requestion method
describe("Create method Test", function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    var book1 = new Book("new school", "physics", "Gandi bi", 1);
    book1.create();
    // creat another book
    var book2 = new Book('new school chemistry', 'chemistry', 0)
    // create user
    var student = new User("joe", "pass", 3);
    student.create();
  });

  test("if request is created", function() {
    var req1 = new Request(1, 1);
    expect(req1.create()).toBe(1);
  });

  test("if user id does not exist", function() {
    var req1 = new Request(1, 2);
    expect(req1.create()).toBeFalsy();
  });

  test("if book id does not exist", function() {
    var req1 = new Request(9, 1);
    expect(req1.create()).toBeFalsy();
  });

  test("if book is taken", function() {
    var req1 = new Request(2, 1);
    expect(req1.create()).toBeFalsy();
  });
});
