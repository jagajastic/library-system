// import user constructor
var User = require('../src/constructors/user');
// import database
var db = require('../database');
// import book
var Book = require('../src/constructors/book');
// import user constructor
var User =  require('../src/constructors/user');

// User constructor suite
describe('User Constructor Test ', function() {
  test('if user constructor can create object', function() {
    var user1 = new User('joe', 'pass', 3);
    expect(user1).toMatchObject({
      id: 1,
      username: 'joe',
      password: 'pass',
      priority: 3
    });
  });

  // create method test suite
  test('if create method add record to the database', function() {
    var user1 = new User('joe', 'pass', 3);
    expect(user1.create()).toBe(1);
  });
});

// read method
describe('Read Test ', function() {
  // read user record method test suite
  test('if read method return user with right user id', function() {
    var user1 = new User('readme', 'pass', 3);
    user1.create();
    expect(user1.read(2)).toMatchObject({
      id: 2,
      username: 'readme',
      password: 'pass',
      priority: 3
    });
  });

  test('if read method return false with wrong user id', function() {
    var user1 = new User('joe', 'pass', 3);
    expect(user1.read(3)).toBeFalsy();
  });

  test('if read method return false when id is not passed', function() {
    var user1 = new User('joe', 'pass', 3);
    expect(user1.read()).toBeFalsy();
  });
});

// update method
describe('Update Test', function() {
  test('if update method return the update users', function() {
    var user1 = new User('lot', 'pass', 1);
    user1.create();
    expect(
      user1.update({ username: 'uuser', password: 'upass', priority: 1 }, 1)
    ).toMatchObject({
      id: 1,
      password: 'upass',
      priority: 1,
      username: 'uuser'
    });
  });

  test('if update method return false when wrong id is passed', function() {
    var user1 = new User('lot', 'pass', 1);
    user1.create();
    expect(
      user1.update({ username: 'uuser', password: 'upass', priority: 1 }, 50)
    ).toBeFalsy();
  });
});

// delete method
describe('Delete method Test', function() {
  test('if record is deleted from database', function() {
    var user1 = new User('lot', 'pass', 1);
    expect(user1.deleteById(1)).toHaveLength(1);
  });

  test('if record is not found', function() {
    var user1 = new User('lot', 'pass', 1);
    expect(user1.deleteById(90)).toBeFalsy();
  });

  test('if record id is undefined', function() {
    var user1 = new User('lot', 'pass', 1);
    expect(user1.deleteById()).toBeFalsy();
  });
});

// book request method
describe('Book Request Test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    var book1 = new Book('javascript', 'programming', 'ninja', 4);
    book1.create();
    var book2 = new Book('css', 'programming', 'ninja', 4);
    book2.create();
    var book3 = new Book('html', 'programming', 'ninja', 4);
    book3.create();
    var book4 = new Book('css', 'programming', 'ninja', 4);
    book4.create();
  });

  test('if user can create book request', function() {
    var user1 = new User('jam', 'pass', 0);
    user1.create();
    expect(user1.createBookRequest({bookId: 1, userId: 1, userPriority: 3})).toBe(1);
  });

  test('if user id is wrong', function () {
    var user1 = new User('cassie', 'try', 0);
    user1.create();
    expect(user1.createBookRequest({bookId: 1, userId: 0, userPriority: 3})).toBeFalsy();
  });

  test('if book id is wrong', function () {
    var user1 = new User('jumal', 'tete', 0);
    user1.create();
    expect(user1.createBookRequest({bookId: 0, userId: 1, userPriority: 3})).toBeFalsy();
  });
});

// read request method
describe('Read book Request Test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    var book1 = new Book('javascript', 'programming', 'ninja', 4);
    book1.create();
    var book2 = new Book('css', 'programming', 'ninja', 4);
    book2.create();
    var book3 = new Book('html', 'programming', 'ninja', 4);
    book3.create();
    var book4 = new Book('css', 'programming', 'ninja', 4);
    book4.create();
    var user1 = new User('jumal', 'tete', 0);
    user1.create();
    user1.createBookRequest({ bookId: 2, userId: 1, userPriority: 3 });
    var user2 = new User('jumal', 'tete', 0);
    user2.create();
    user2.createBookRequest({ bookId: 1, userId: 1, userPriority: 3 });
  });

  test('if read book request return the book', function() {
    var user1 = new User('Kasim', 'otak', 0);
    user1.create();
    expect(user1.readBookRequest(1)).toMatchObject({
      bookId: 2,
      id: 1,
      status: 'pending',
      userId: 1
    });
  });

  test('if read book request id does not exist', function () {
    var user1 = new User('Kasim', 'otak', 0);
    user1.create();
    expect(user1.readBookRequest(0)).toBeFalsy();
  });

  test('if read book request id is undefined', function () {
    var user1 = new User('Kasim', 'otak', 0);
    user1.create();
    expect(user1.readBookRequest()).toBeFalsy();
  });

  test('if read book request id is null', function () {
    var user1 = new User('Kasim', 'otak', 0);
    user1.create();
    expect(user1.readBookRequest(null)).toBeFalsy();
  });
});

