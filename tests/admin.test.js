// import admin constructors
import Admin from '../src/constructors/admin';
// let Admin = require('../src/constructors/admin');
// import user constructor
import User from '../src/constructors/user';
// let User = require('../src/constructors/user');
// import book
import Book from '../src/constructors/book';
// let Book = require('../src/constructors/book');

// admin constructor suite
describe('Admin Constructor Test suite', function() {
  test('if admin constructor can create object', function() {
    let admin = new Admin('admin', 'admin', 4);
    expect(admin).toMatchObject({
      id: 1,
      username: 'admin',
      password: 'admin',
      priority: 4
    });
  });
});

// approve request method
describe('Approve Book Request', function() {
  beforeAll(function() {
    let adabe = new User('adabs', 'pass', 2);
    adabe.createUser();
    let emma = new User('emma', 'jiga', 2);
    emma.createUser();
    let tony = new User('tony', 'ty', 3);
    tony.createUser();
    let josh = new User('josh', 'js', 1);
    josh.createUser();
    // create book
    let pie = new Book('pie', 'adventure', 'authur', 2);
    pie.createBook();
    let newSchool = new Book('new school physics', 'science', 'author', 4);
    newSchool.createBook();
    let java = new Book('java', 'programming', 'jbins', 1);
    java.createBook();
    let python = new Book('python', 'programming', 'pycham', 2);
    python.createBook();
    // request
    adabe.createBookRequest({ bookId: 1, userId: 1, userPriority: 2 });
    emma.createBookRequest({ bookId: 3, userId: 2, userPriority: 1 });
    tony.createBookRequest({ bookId: 2, userId: 3, userPriority: 3 });
    josh.createBookRequest({ bookId: 3, userId: 4, userPriority: 2 });
  });
  test('if Admin can approve request', function() {
    let admin = new Admin('admin', 'pas', 4);
    admin.createAdmin();
    expect(admin.approveBookRequest()).toBeTruthy();
  });

  test('if user is not admin', function() {
    let admin = new Admin('admin', 'pas', 3);
    admin.createAdmin();
    expect(admin.approveBookRequest()).toBeFalsy();
  });
});

// delete request test
describe('Delete Request by Id Test', function() {
  test('if admin can delete request', function() {
    let admin = new Admin('admin', 'pas', 3);
    admin.createAdmin();
    expect(admin.deleteBookRequest(1)).toMatchObject([
      { bookId: 1, id: 1, status: 'Approved', userId: 1, userPriority: 2 }
    ]);
  });

  test('if request id is wrong', function() {
    let admin = new Admin('admin', 'pas', 3);
    admin.createAdmin();
    expect(admin.deleteBookRequest(40)).toBeFalsy();
  });

  test('if request id is undefined or null', function() {
    let admin = new Admin('admin', 'pas', 3);
    admin.createUser();
    expect(admin.deleteBookRequest()).toBeFalsy();
  });

});

// delete all request 
describe('Delete all book request', function () {
  test('if admin can delete all book request', function () {
    let admin = new Admin('admin', 'pas', 4);
    admin.createAdmin();
    expect(admin.deleteAllBookRequest()).toBe(0);
  });
});
