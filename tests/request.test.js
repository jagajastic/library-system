// import book
var Book = require("../src/constructors/book");
// import user
var User = require("../src/constructors/user");
// import request
var Request = require("../src/constructors/request");
// import database
var db = require("../database");
// import user constructor
var User = require('../src/constructors/user');

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
    var book2 = new Book("new school chemistry", "chemistry", 0);
    // create user
    var student = new User("joe", "pass", 3);
    student.create();
  });

  test("if request is created", function() {
    var req1 = new Request(1, 1, 3);
    expect(req1.create()).toBe(1);
  });

  test("if user id does not exist", function() {
    var req1 = new Request(1, 2, 3);
    expect(req1.create()).toBeFalsy();
  });

  test("if book id does not exist", function() {
    var req1 = new Request(9, 1, 3);
    expect(req1.create()).toBeFalsy();
  });

  test("if book is taken", function() {
    var req1 = new Request(2, 1, 3);
    expect(req1.create()).toBeFalsy();
  });
});

// read request method
describe("Read request Method test", function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    var book1 = new Book("new school", "physics", "Gandi bi", 4);
    book1.create();
    // creat another book
    var book2 = new Book("new school chemistry", "chemistry", 0);
    book2.create();
    // create user
    var student = new User("joe", "pass", 3);
    student.create();
  });

  test("if request is found", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.read(1)).toMatchObject({
      bookId: 1,
      id: 1,
      status: 'pending',
      userId: 1
    });
  });

  test("if request id is nnot passed", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.read()).toBeFalsy();
  });

  test("if request id is not found", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.read(5)).toBeFalsy();
  });

  test("if request id is zero", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.read(0)).toBeFalsy();
  });

  test("if request id is undefined", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.read(undefined)).toBeFalsy();
  });
});

// update method tes 
describe("Update request method Test", function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    var book1 = new Book("new school", "physics", "Gandi bi", 4);
    book1.create();
    // creat another book
    var book2 = new Book("new school chemistry", "chemistry", 0);
    book2.create();
    // create user
    var student = new User("joe", "pass", 3);
    student.create();
  });

  test("if record was updated", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.update({ bookId: 4 }, 1)).toBeTruthy();
  });

  test("if request id does not exist", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.update({ bookId: 4 }, 4)).toBeFalsy();
  });

  test("if request id is undefined", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    expect(req1.update({ bookId: 4 })).toBeFalsy();
  });
});

// delete request method
describe("Delete request method test", function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    var book1 = new Book("new school", "physics", "Gandi bi", 4);
    book1.create();
    // creat another book
    var book2 = new Book("new school chemistry", "chemistry", 0);
    book2.create();
    // create user
    var student = new User("joe", "pass", 3);
    student.create();
  });

  test("if request is removed", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    var req2 = new Request(1, 1, 3);
    req2.create();
    expect(req1.delete(1)).toHaveLength(1);
  });

  test("if request id is undefined", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    var req2 = new Request(1, 1, 3);
    req2.create();
    expect(req1.delete()).toBeFalsy();
  });

  test("if request id is not found", function() {
    var req1 = new Request(1, 1, 3);
    req1.create();
    var req2 = new Request(1, 1, 3);
    req2.create();
    expect(req1.delete(20)).toBeFalsy();
  });
});
