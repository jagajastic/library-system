// import user constructor
import User from '../src/constructors/user';
// let User = require('../src/constructors/user');
// import database
import db from '../database';
// let db = require('../database');
// import book
import Book from '../src/constructors/book';
// let Book = require('../src/constructors/book');
// import user constructor

// User constructor suite
describe('User Constructor Test ', function() {
  test('if user constructor can create object', function() {
    let user1 = new User('joe', 'pass', 3);
    expect(user1).toMatchObject({
      id: 1,
      username: 'joe',
      password: 'pass',
      priority: 3
    });
  });

  // create user method test suite
  test('if create method add record to the database', function() {
    let user1 = new User('joe', 'pass', 3);
    expect(user1.createUser()).toBe(1);
  });

  test('if user creatiion return false for priority equal 4', function() {
    let user1 = new User('joe', 'pass', 4);
    expect(user1.createUser()).toBeFalsy();
  });
});

// read method
describe('Read Test ', function() {
  // read user record method test suite
  test('if read method return user with right user id', function() {
    let user1 = new User('readme', 'pass', 3);
    user1.createUser();
    expect(user1.readUser(2)).toMatchObject({
      id: 2,
      username: 'readme',
      password: 'pass',
      priority: 3
    });
  });

  test('if read method return false with wrong user id', function() {
    let user1 = new User('joe', 'pass', 3);
    expect(user1.readUser(3)).toBeFalsy();
  });

  test('if read method return false when id is not passed', function() {
    let user1 = new User('joe', 'pass', 3);
    expect(user1.readUser()).toBeFalsy();
  });
});

// update method
describe('Update Test', function() {
  test('if update method return the updated users', function() {
    let user1 = new User('lot', 'pass', 1);
    user1.createUser();
    expect(
      user1.updateUser({ username: 'uuser', password: 'upass', priority: 1 }, 1)
    ).toMatchObject({
      id: 1,
      password: 'upass',
      priority: 1,
      username: 'uuser'
    });
  });

  test('if update method return false when wrong id is passed', function() {
    let user1 = new User('lot', 'pass', 1);
    user1.createUser();
    expect(
      user1.updateUser({ username: 'uuser', password: 'upass', priority: 1 }, 50)
    ).toBeFalsy();
  });
});

// delete method
describe('Delete method Test', function() {
  test('if record is deleted from database', function() {
    let user1 = new User('lot', 'pass', 1);
    expect(user1.deleteUser(1)).toHaveLength(1);
  });

  test('if record is not found', function() {
    let user1 = new User('lot', 'pass', 1);
    expect(user1.deleteUser(90)).toBeFalsy();
  });

  test('if record id is undefined', function() {
    let user1 = new User('lot', 'pass', 1);
    expect(user1.deleteUser()).toBeFalsy();
  });
});

// book request method
describe('Book Request Test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    let book1 = new Book('javascript', 'programming', 'ninja', 4);
    book1.createBook();
    let book2 = new Book('css', 'programming', 'ninja', 4);
    book2.createBook();
    let book3 = new Book('html', 'programming', 'ninja', 4);
    book3.createBook();
    let book4 = new Book('css', 'programming', 'ninja', 4);
    book4.createBook();
  });

  test('if user can create book request', function() {
    let user1 = new User('jam', 'pass', 0);
    user1.createUser();
    expect(user1.createBookRequest({bookId: 1, userId: 1, userPriority: 3})).toBe(1);
  });

  test('if user id is wrong', function () {
    let user1 = new User('cassie', 'try', 0);
    user1.createUser();
    expect(user1.createBookRequest({bookId: 1, userId: 0, userPriority: 3})).toBeFalsy();
  });

  test('if book id is wrong', function () {
    let user1 = new User('jumal', 'tete', 0);
    user1.createUser();
    expect(user1.createBookRequest({bookId: 0, userId: 1, userPriority: 3})).toBeFalsy();
  });
});

// read request method
describe('Read book Request Test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    let book1 = new Book('javascript', 'programming', 'ninja', 4);
    book1.createBook();
    let book2 = new Book('css', 'programming', 'ninja', 4);
    book2.createBook();
    let book3 = new Book('html', 'programming', 'ninja', 4);
    book3.createBook();
    let book4 = new Book('css', 'programming', 'ninja', 4);
    book4.createBook();
    let user1 = new User('jumal', 'tete', 0);
    user1.createUser();
    user1.createBookRequest({ bookId: 2, userId: 1, userPriority: 3 });
    let user2 = new User('jumal', 'tete', 0);
    user2.createUser();
    user2.createBookRequest({ bookId: 1, userId: 1, userPriority: 3 });
  });

  test('if read book request return the book', function() {
    let user1 = new User('Kasim', 'otak', 0);
    user1.createUser();
    expect(user1.readBookRequest(1)).toMatchObject({
      bookId: 2,
      id: 1,
      status: 'pending',
      userId: 1
    });
  });

  test('if read book request id does not exist', function () {
    let user1 = new User('Kasim', 'otak', 0);
    user1.createUser();
    expect(user1.readBookRequest(0)).toBeFalsy();
  });

  test('if read book request id is undefined', function () {
    let user1 = new User('Kasim', 'otak', 0);
    user1.createUser();
    expect(user1.readBookRequest()).toBeFalsy();
  });

  test('if read book request id is null', function () {
    let user1 = new User('Kasim', 'otak', 0);
    user1.createUser();
    expect(user1.readBookRequest(null)).toBeFalsy();
  });
});

