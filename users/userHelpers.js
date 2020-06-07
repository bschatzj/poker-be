const db = require("../dbconfig");

module.exports = {
    update,
    getUser,
    getAllUsers
}

function update(id, update) {
    return db('dev')
    .where({ id })
    .update(update)
}

function getUser(id) {
    return db('dev')
    .where( { id } )
}

function getAllUsers() {
    return db('dev')
}