// import assign id function 
var assignId = require('../../helpers/assign-id');
// books
function Book (title, category, author, quantity){
    this.id = assignId('books');
    this.title = title;
    this.category = category;
    this.author = author;
    this.quantity = quantity;
};

// export book constructor
module.exports = Book;