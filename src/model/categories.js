const pool = require('../config/db')

class Models {
    getData = () => { 
        return pool.query('SELECT id, name FROM categories')};
    insertData = ({name, description, stock, price, category}) => { 
        return pool.query(  `INSERT INTO products (name, description, stock, price, category_id) VALUES 
                            ($1,$2,$3,$4,$5)`,[name, description, stock, price, category])
    };
    updateData = async ({ id, name, description, stock, price, category}) => {
        return pool.query(` UPDATE products SET 
                            name = $1, description = $2, stock = $3, price = $4, category_id = $5
                            WHERE id = $6`, [name, description, stock, price, category, id])
    };
    deleteData = async ( id ) => {
        return pool.query('DELETE FROM products WHERE id= $1', [id] )
    };
}

module.exports = Models;