// import book
import Book from '../src/constructors/book';
// let Book = require('../src/constructors/book');
// import user
import User from '../src/constructors/user';
// let User = require('../src/constructors/user');
// import request
import Request from '../src/constructors/request';
// let Request = require('../src/constructors/request');
// import database
import db from '../database';
// let db = require('../database');

// create book requestion method
describe('Create method Test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    let book1 = new Book('new school', 'physics', 'Gandi bi', 1);
    book1.createBook();
    // creat another book
    let book2 = new Book('new school chemistry', 'chemistry', 'ali baba', 0);
    book2.createBook();
    // create user
    let student = new User('joe', 'pass', 3);
    student.createUser();
  });

  test('if request is created', function() {
    let req1 = new Request(1, 1, 3);
    expect(req1.createBookRequest()).toBe(1);
  });

  test('if user id does not exist', function() {
    let req1 = new Request(1, 2, 3);
    expect(req1.createBookRequest()).toBeFalsy();
  });

  test('if book id does not exist', function() {
    let req1 = new Request(9, 1, 3);
    expect(req1.createBookRequest()).toBeFalsy();
  });

  test('if book is taken', function() {
    let req1 = new Request(2, 1, 3);
    expect(req1.createBookRequest()).toBe('book taken');
  });
});

// read request method
describe('Read request Method test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    let book1 = new Book('new school', 'physics', 'Gandi bi', 4);
    book1.createBook();
    // creat another book
    let book2 = new Book('new school chemistry', 'chemistry', 'tab Bi', 0);
    book2.createBook();
    // create user
    let student = new User('joe', 'pass', 3);
    student.createUser();
  });

  test('if request is found', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    expect(req1.readBookRequest(1)).toMatchObject({
      bookId: 1,
      id: 1,
      status: 'pending',
      userId: 1
    });
  });

  test('if request id is not passed', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    expect(req1.readBookRequest()).toBeFalsy();
  });

  test('if request id is not found', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    expect(req1.readBookRequest(5)).toBeFalsy();
  });

  test('if request id is zero', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    expect(req1.readBookRequest(0)).toBeFalsy();
  });
});

// update book request method test
describe('Update request method Test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    let book1 = new Book('new school', 'physics', 'Gandi bi', 4);
    book1.createBook();
    // creat another book
    let book2 = new Book('new school chemistry', 'chemistry', 0);
    book2.createBook();
    // create user
    let student = new User('joe', 'pass', 3);
    student.createUser();
  });

  test('if record was updated', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    expect(req1.updateBookRequest({ bookId: 4 }, 1)).toBeTruthy();
  });

  test('if request id does not exist', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    expect(req1.updateBookRequest({ bookId: 4 }, 4)).toBeFalsy();
  });

  test('if request id is undefined', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    expect(req1.updateBookRequest({ bookId: 4 })).toBeFalsy();
  });

});

// delete request method
describe('Delete request method test', function() {
  beforeAll(function() {
    db.users.length = 0;
    db.books.length = 0;
    db.request.length = 0;
    // create book
    let book1 = new Book('new school', 'physics', 'Gandi bi', 4);
    book1.createBook();
    // creat another book
    let book2 = new Book('new school chemistry', 'chemistry', 0);
    book2.createBook();
    // create user
    let student = new User('joe', 'pass', 3);
    student.createUser();
  });

  test('if request is removed', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    let req2 = new Request(1, 1, 3);
    req2.createBookRequest();
    expect(req1.deleteBookRequest(1)).toHaveLength(1);
  });

  test('if request id is undefined', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    let req2 = new Request(1, 1, 3);
    req2.createBookRequest();
    expect(req1.deleteBookRequest(null)).toBeFalsy();
  });

  test('if request id is not found', function() {
    let req1 = new Request(1, 1, 3);
    req1.createBookRequest();
    let req2 = new Request(1, 1, 3);
    req2.createBookRequest();
    expect(req1.deleteBookRequest(20)).toBeFalsy();
  });
});


