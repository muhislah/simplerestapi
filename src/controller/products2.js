const { getData, insertData, updateData, deleteData , searchData , paginationData , count} = require("../model/products2");
const express = require("express");
const app = express();
const response = require("../helper/response");
const createError = require("http-errors");
const errorInternal = new createError.InternalServerError();

// function to Get All Data or Detail
module.exports.getData = async (req, res, next) => {
    try {
        const { id } = req.params;
        let { search , limit, page } = req.query;
        if (search) {
            const result = await searchData(search);
            res.json(response.okSearch(result.rows, search));
        }else{
            if ( limit && page){
                const result = await paginationData(page, limit);
                const { rows : [{count : countData}]} = await count();
                res.json(response.okPagination(result.rows, page, limit, +countData));
            } else if ( limit && !page) {
                page = 1;
                const result = await paginationData(page, limit);
                const { rows : [{count : countData}]} = await count();
                res.json(response.okPagination(result.rows, page, limit, +countData));
            } else {
                const result = await getData({id});
                if (!id) {
                    res.json(response.okGet(result.rows));
                } else {
                    res.json(response.okGetDetail(result.rows, id));
                }
            }
        res.end();
        }
    } catch (err) {
        next(errorInternal);
    }
};

//insert data
module.exports.insertData = async (req, res, next) => {
        try {
            const result = await insertData(req.body);
            res.json(response.okInsert(req.body));
        } catch (err) {
            next(errorInternal);
        }
};

module.exports.updateData = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const result = await updateData({ id , ...req.body });
        res.json(response.okUpdate(id));
    } catch (err) {
        next(errorInternal);
    }
};

module.exports.deleteData = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const result = await deleteData(id);
        res.json(response.okDelete(id));
    } catch (err) {
        next(errorInternal);
    }
};