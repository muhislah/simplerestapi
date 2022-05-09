const pool = require("../config/db");

const addUser = ({id, username, password, email}) => {
    return pool.query("INSERT INTO users (id, username, password, email) VALUES ($1, $2, $3, $4)",[id, username, password, email]);
};

module.exports = { addUser };