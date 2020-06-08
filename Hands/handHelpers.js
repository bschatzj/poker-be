const db = require("../dbconfig");

module.exports = {
    getUserHand,
    addHand,
}

function getUserHand(id){
    return db("hands")
    .where({id})
}

function addHand(handInfo){
    console.log(handInfo)
    return db("hands").insert(handInfo)
}