// import book constructor
var Book = require('../src/constructors/book');

// book constructor suite
describe('Book Constructor Test suite', function() {
  test('if book constructor can create object', function() {
    var book1 = new Book('new school', 'maths', 'Gandi Bi', 1);
    expect(book1).toMatchObject({
      id: 1,
      title: 'new school',
      category: 'maths',
      author: 'Gandi Bi',
      quantity: 1
    });
  });
});

// create book suite
describe('Create book Test', function() {
  test('if book method add record to db', function() {
    var book1 = new Book('new school', 'maths', 'Gandi Bi', 3);
    expect(book1.createBook()).toBe(1);
  });
});

// read book
describe('Read Book Test', function() {
  test('if the return value is book', function() {
    var book1 = new Book('new school', 'maths', 'Gandi Bi', 3);
    book1.createBook();
    expect(book1.readBook(2)).toMatchObject({
      author: 'Gandi Bi',
      category: 'maths',
      id: 2,
      quantity: 3,
      title: 'new school'
    });
  });

  test('if the value return false when id is not found', function() {
    var book1 = new Book('new school', 'maths', 'Gandi Bi', 3);
    book1.createBook();
    expect(book1.readBook(80)).toBeFalsy();
  });

  test('if the return value is false when id given', function() {
    var book1 = new Book('new school', 'maths', 'Gandi Bi', 3);
    book1.createBook();
    expect(book1.readBook(80)).toBeFalsy();
  });
});

// update method
describe('Update Test', function() {
  test('if record updated and save to database', function() {
    var book1 = new Book('General math', 'maths', 'Prof Basi', 2);
    expect(
      book1.updateBook(
        {
          title: 'uGeneral math',
          category: 'umaths',
          author: 'uGen',
          quantity: 4
        },
        4
      )
    ).toBeTruthy();
  });

  test('if record id is not found', function() {
    var book1 = new Book('General math', 'maths', 'Prof Basi', 2);
    expect(
      book1.updateBook({
        title: 'uGeneral math',
        category: 'umaths',
        author: 'uGen',
        quantity: 4
      })
    ).toBeFalsy();
  });
});

// delete method
describe('Update method Test', function() {
  test('if deleted record is return ', function() {
    var book1 = new Book('General math', 'maths', 'Prof Basi', 110);
    expect(book1.deleteBook(1)).toHaveLength(1);
  });

  test('if record to be deleted have wrong id ', function() {
    var book1 = new Book('General math', 'maths', 'Prof Basi', 110);
    expect(book1.deleteBook(16)).toBeFalsy();
  });

  test('if record id is not passed', function() {
    var book1 = new Book('General math', 'maths', 'Prof Basi', 110);
    expect(book1.deleteBook()).toBeFalsy();
  });
});

//  search book
describe('Search Test Suite', function() {
  test('if book is found, return the book(s)', function() {
    var book2 = new Book('news conprehensive math', 'maths', 'Gandi Bi', 3);
    book2.createBook();
    expect(book2.searchBook('new')).toHaveLength(3);
  });

  test('if book is not found, return empty search', function() {
    var book2 = new Book('news conprehensive math', 'maths', 'Gandi Bi', 3);
    book2.createBook();
    expect(book2.searchBook('newsy')).toHaveLength(0);
  });

  test('if book title is not given, return false', function() {
    var book2 = new Book('news conprehensive math', 'maths', 'Gandi Bi', 3);
    book2.createBook();
    expect(book2.searchBook()).toBeFalsy();
  });

  test('if book title is a number, return false', function() {
    var book2 = new Book('news conprehensive math', 'maths', 'Gandi Bi', 3);
    book2.createBook();
    expect(book2.searchBook(4)).toBeFalsy();
  });
});


