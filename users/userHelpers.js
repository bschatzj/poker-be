const db = require("../dbconfig");

module.exports = {
    update,
    getUser,
    getAllUsers
}

function update(id, update) {
    return db('users')
    .where({ id })
    .update(update)
}

function getUser(id) {
    return db('users')
    .where( { id } )
    .first()  
}

function getAllUsers() {
    return db('users')
}