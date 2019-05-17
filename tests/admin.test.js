// import admin constructor
var Admin = require("../src/constructors/admin");

// admin constructor suite
describe("Admin Constructor Test suite", function() {
    test("if admin constructor can create object", function() {
      var admin = new Admin('admin', 'admin', 0);
      expect(admin).toMatchObject({
        id: 1,
        username: "admin",
        password: "admin",
        priority: 0
      });
    });
  });
  