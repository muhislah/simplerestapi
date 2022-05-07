const { Pool } = require('pg')

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'simpleapi',
    password : 'toor',
    port : 5432
})

module.exports = pool;