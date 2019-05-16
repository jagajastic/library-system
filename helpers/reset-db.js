// import database
var db = require('../database');

// reset database function 
function resetDB (collection) {
    return db[collection].length = 0;
}

// export reset function 
module.exports = resetDB; 