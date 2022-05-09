const response = require("../helper/response");
const createError = require("http-errors");
const errorInternal = new createError.InternalServerError();
const { getData, insertData, updateData, deleteData } = require("../model/categories");

module.exports.getData = async (req, res, next) => {
    try {
        const result = await getData();
        res.json(response.okGet(result.rows));
    }catch(err){
        console.log(err);
        next(errorInternal);
    }
    
};

module.exports.insertData = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        await insertData(id, name);
        res.json(response.okInsert(req.body));
    }catch(err){
        console.log(err);
        next(errorInternal);
    }
    
};

module.exports.updateData = async (req, res, next) => {
    try {
        const { name } = req.body;
        const id = req.params.id;
        const result = await updateData(id, name);
        if ( result.rowCount == 0){
            next(createError.BadRequest());
        }
        res.json(response.okUpdate(id));
    }catch(err){
        console.log(err);
        next(errorInternal);
    }
    
};

module.exports.deleteData = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteData(id);
        res.json(response.okDelete(id));
    }catch(err){
        console.log(err);
        next(errorInternal);
    }
    
};