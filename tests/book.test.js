// import book constructor
var Book = require("../src/constructors/book");
// import database
var db = require("../database");

// book constructor suite
describe("Book Constructor Test suite", function() {
  test("if book constructor can create object", function() {
    var book1 = new Book("new school", "maths", "Gandi Bi", 1);
    expect(book1).toMatchObject({
      id: 1,
      title: "new school",
      category: "maths",
      author: "Gandi Bi",
      quantity: 1
    });
  });
});

// create book suite
describe("Create book Test", function() {
  test("if book method add record to db", function() {
    var book1 = new Book("new school", "maths", "Gandi Bi", 3);
    expect(book1.create()).toBe(1);
  });
});

// read book
describe("Read Book Test", function() {
  test("if the return value is book", function() {
    var book1 = new Book("new school", "maths", "Gandi Bi", 3);
    book1.create();
    expect(book1.read(2)).toMatchObject({
      author: "Gandi Bi",
      category: "maths",
      id: 2,
      quantity: 3,
      title: "new school"
    });
  });

  test("if the value return false when id is not found", function() {
    var book1 = new Book("new school", "maths", "Gandi Bi", 3);
    book1.create();
    expect(book1.read(80)).toBeFalsy();
  });

  test("if the return value is false when id given", function() {
    var book1 = new Book("new school", "maths", "Gandi Bi", 3);
    book1.create();
    expect(book1.read(80)).toBeFalsy();
  });
});

// update method
describe("Update Test", function() {
  test("if record updated and save to database", function() {
    var book1 = new Book("General math", "maths", "Prof Basi", 2);
    expect(
      book1.update(
        {
          title: "uGeneral math",
          category: "umaths",
          author: "uGen",
          quantity: 4
        },
        4
      )
    ).toBeTruthy();
  });

  test("if record id is not found", function() {
    var book1 = new Book("General math", "maths", "Prof Basi", 2);
    expect(
      book1.update(
        {
          title: "uGeneral math",
          category: "umaths",
          author: "uGen",
          quantity: 4
        },
        
      )
    ).toBeFalsy();
  });

});

// delete method
describe('Update method Test', function () {
  test('if deleted record is return ', function () {
    var book1 = new Book("General math", "maths", "Prof Basi", 110);
    expect(book1.delete(1)).toHaveLength(1);
  });

  test('if record to be deleted have wrong id ', function () {
    var book1 = new Book("General math", "maths", "Prof Basi", 110);
    expect(book1.delete(16)).toBeFalsy();
  });
  
  test('if record id is not passed', function () {
    var book1 = new Book("General math", "maths", "Prof Basi", 110);
    expect(book1.delete()).toBeFalsy();
  });
});