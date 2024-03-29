// import database
import db from '../database';

// find book function by id
function findBook(id) {
      // return false if id is undefined
  if (!id) {
    return false;
  }
  // start of the array
  let start = 0;
  // end of the array
  let end = db.books.length - 1;
  // middle of the array
  let middle = Math.floor((start + end) / 2);
  while (db.books[middle].id !== id && start <= end) {
    // check if id is less than the middle item id and reassign end to (middle -1)
    if (id < db.books[middle].id) end = middle - 1;
    // assign middle +1 to start
    else start = middle + 1;
    // define new middle
    middle = Math.floor((start + end) / 2);
  }
  // return the book if id is eqaul else return false
  return db.books[middle].id === id ? db.books[middle] : false;
}

export default findBook;
// module.exports = findBook;
