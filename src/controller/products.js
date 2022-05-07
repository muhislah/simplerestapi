const express = require('express');
const app = express()
const Models = require('../model/products')
const model = new Models();
const errorCode = require('../helper/errorSql');
const clause = require('../helper/getClause')

class Controller {
    getData = async (req, res) => {
        try {
            const { search, sortby, sort, limit, page} = req.query
            const fullQuery = clause(search, sort, sortby, page, limit)
            const result = await model.getData(fullQuery);
            res.json({
                data: result.rows
            })
        } catch (err) {
            const code = err.code;
            res.json({
                message : 'there is an error',
                description : errorCode[code]
            })
        }
    };
    insertData = async (req, res) => {
        try {
            const result = await model.insertData(req.body);
            const {
                rows: data
            } = await model.getData()
            res.json({
                message: 'berhasil tambah data',
                data: data
            })
        } catch (err) {
            console.log(err)
        }
    };
    updateData = async (req, res) => {
        try {
            const id = +req.params.id;
            const result = await model.updateData({ id , ...req.body });
            const { rows: data } = await model.getData()
            res.json({
                message: 'berhasil update data',
                data: data
            })
        } catch (err) {
            console.log(err)
        }
    }
    deleteData = async (req, res) => {
        try {
            const id = +req.params.id;
            const result = await model.deleteData(id);
            const { rows: data } = await model.getData()
            res.json({
                message: 'berhasil menghapus data index ke-'+id,
                data: data
            })
        } catch (err) {
            const code = err.code;
            res.json({
                message : 'there is an error',
                description : errorCode[code]
            })
        }
    }
}

module.exports = Controller