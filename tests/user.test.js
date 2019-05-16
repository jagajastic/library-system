// import user constructor
var User = require("../src/constructors/user");
// import reset database function
var resetDB = require("../helpers/reset-db");
// import database
var db = require("../database");

// User constructor suite
describe("User Constructor Test suite", function() {
  test("if user constructor can create object", function() {
    var user1 = new User("joe", "pass", 3);
    expect(user1).toMatchObject({
      id: 1,
      username: "joe",
      password: "pass",
      priority: 3
    });
  });

  // create method test suite
  test("if create method add record to the database", function() {
    var user1 = new User("joe", "pass", 3);
    expect(user1.create()).toBe(1);
  });
});

// read method
describe("Read Test Suite", function() {
  // read user record method test suite
  test("if read method return user with right user id", function() {
    var user1 = new User("readme", "pass", 3);
    user1.create();
    expect(user1.read(2)).toMatchObject({
      id: 2,
      username: "readme",
      password: "pass",
      priority: 3
    });
  });

  test("if read method return false with wrong user id", function() {
    var user1 = new User("joe", "pass", 3);
    expect(user1.read(3)).toBeFalsy();
  });

  test("if read method return false when id is not passed", function() {
    var user1 = new User("joe", "pass", 3);
    expect(user1.read()).toBeFalsy();
  });
});

// update method
describe("Update Test Suite", function() {
  test("if update method return the update users", function() {
    var user1 = new User("lot", "pass", 1);
    user1.create();
    expect(
      user1.update({ username: "uuser", password: "upass", priority: 1 }, 1)
    ).toMatchObject({
      id: 1,
      password: "upass",
      priority: 1,
      username: "uuser"
    });
  });

  test("if update method return false when wrong id is passed", function() {
    var user1 = new User("lot", "pass", 1);
    user1.create();
    expect(
      user1.update({ username: "uuser", password: "upass", priority: 1 }, 50)
    ).toBeFalsy();
  });
});
