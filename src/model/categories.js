const pool = require("../config/db");

module.exports.getData = () => {
    return pool.query("SELECT id, name FROM categories");
};
module.exports.insertData = (id, name) => {
    return pool.query("INSERT INTO categories (id, name) VALUES ($1,$2)",[id,name]);
};
module.exports.updateData = (id, name) => {
    return pool.query("UPDATE categories SET name=$1 WHERE id= $2",[name, id]);
};
module.exports.deleteData = (id) => {
    return pool.query("DELETE FROM categories WHERE id = $1",[id]);
};