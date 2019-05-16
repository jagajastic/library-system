// import user constructor
var User = require("../src/constructors/user");

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
});
