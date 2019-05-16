// import admin constructor
var Admin = require("../src/constructors/admin");

// admin constructor suite
describe("Admin Constructor Test suite", function() {
    test("if admin constructor can create object", function() {
      var admin = new Admin("admin", "admin");
      expect(admin).toMatchObject({
        id: 1,
        username: "admin",
        password: "admin"
      });
    });
  });
  