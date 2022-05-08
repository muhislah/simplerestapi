const pool = require('../config/db')

const getData = ({ id }) => {
    const query = id ? `SELECT * FROM products WHERE id = ${id}` : `SELECT id, name, stock, price FROM products`
    return pool.query(query)
}

const searchData = (key) => {
    return pool.query(`SELECT id, name,stock,price FROM products WHERE LOWER(name) LIKE LOWER('%${key}%')`)
}

const paginationData = (page, limit) => {
    return pool.query(`SELECT id, name,stock, price FROM products OFFSET ${(page-1)*limit} LIMIT ${limit}`)
}

const count = () => {
    return pool.query(`SELECT COUNT(*) FROM products`)
}

const insertData = ({name, description, stock, price, category}) => { 
            return pool.query(`INSERT INTO products (name, description, stock, price, category_id) VALUES ($1,$2,$3,$4,$5)`,[name, description, stock, price, category])
}

const updateData = ({ id, name, description, stock, price, category}) => {
        return pool.query(` UPDATE products SET 
                            name = $1, description = $2, stock = $3, price = $4, category_id = $5
                            WHERE id = $6`, [name, description, stock, price, category, id])
}
const deleteData = ( id ) => {
        return pool.query('DELETE FROM products WHERE id= $1', [id] )
}

module.exports = { getData , insertData, updateData , deleteData , searchData, paginationData, count}