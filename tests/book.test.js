// import book constructor
var Book = require("../src/constructors/book");

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
  