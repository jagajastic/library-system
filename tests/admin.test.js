// import admin constructor
var Admin = require("../src/constructors/admin");
// import user constructor
var User = require("../src/constructors/user");
// import book
var Book = require("../src/constructors/book");
// import book request
var Request = require("../src/constructors/request");
// import db
var db = require("../database");

// admin constructor suite
describe("Admin Constructor Test suite", function() {
  test("if admin constructor can create object", function() {
    var admin = new Admin("admin", "admin", 4);
    expect(admin).toMatchObject({
      id: 1,
      username: "admin",
      password: "admin",
      priority: 4
    });
  });
});

// approve request method
describe("", function() {
  beforeAll(function() {
    var adabe = new User("adabs", "pass", 2);
    adabe.create();
    var emma = new User("emma", "jiga", 2);
    emma.create();
    var tony = new User("tony", "ty", 3);
    tony.create();
    var josh = new User("josh", "js", 1);
    josh.create();
    // create book
    var pie = new Book("pie", "adventure", "authur", 2);
    pie.create();
    var newSchool = new Book("new school physics", "science", 4);
    newSchool.create();
    var java = new Book("java", "programming", "jbins", 3);
    java.create();
    var python = new Book("python", "programming", "pycham", 2);
    python.create();
    // request
    adabe.createBookRequest({ bookId: 1, userId: 1, userPriority: 2 });
    emma.createBookRequest({ bookId: 3, userId: 2, userPriority: 1 });
    tony.createBookRequest({ bookId: 2, userId: 3, userPriority: 3 });
    josh.createBookRequest({ bookId: 3, userId: 4, userPriority: 2 });
  });
  test("if Admin can approve request", function() {
    var admin = new Admin("admin", "pas", 4);
    admin.create();
    expect(admin.approveBookRequest()).toBeTruthy();
  });

  test("if user is not admin", function() {
    var admin = new Admin("admin", "pas", 3);
    admin.create();
    expect(admin.approveBookRequest()).toBeFalsy();
  });
});

// delete request test
describe("Delete Request by Id Test", function() {
  test("if admin can delete request", function() {
    var admin = new Admin("admin", "pas", 3);
    admin.create();
    expect(admin.delete(1)).toMatchObject([
      { bookId: 1, id: 1, status: "Approved", userId: 1, userPriority: 2 }
    ]);
  });

  test("if request id is wrong", function() {
    var admin = new Admin("admin", "pas", 3);
    admin.create();
    expect(admin.delete(40)).toBeFalsy();
  });

  test("if request id is undefined or null", function() {
    var admin = new Admin("admin", "pas", 3);
    admin.create();
    expect(admin.delete()).toBeFalsy();
  });

});

// delete all request 
describe('Delete all book request', function () {
  test('if admin can delete all book request', function () {
    var admin = new Admin("admin", "pas", 4);
    admin.create();
    expect(admin.deleteAll()).toBe(0);
  });

  
});