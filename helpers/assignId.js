// import database
import db from '../database';
// generate id from collection pass as argument
function assignId(typeOfId) {
  // return the generated id
  return db[typeOfId].length ? db[typeOfId][db[typeOfId].length - 1].id + 1 : 1;
}

//  export assignID function to be access globally
export default assignId;
// module.exports = assignId;
