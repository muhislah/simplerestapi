const { getData, insertData, updateData, deleteData , searchData , paginationData , count} = require("../model/products2");
const response = require("../helper/response");
const createError = require("http-errors");
const errorInternal = new createError.InternalServerError();

// function to Get All Data or Detail
module.exports.getData = async (req, res, next) => {
    try {
        const { id } = req.params;
        let { sortby, sort , search , limit, page } = req.query;
        if (search) {
            const result = await searchData(search);
            res.json(response.okSearch(result.rows, search));
        }else{
            if ( sortby || sort || limit || page){
                sortby = sortby || "id";
                sort = sort || "ASC";
                limit = limit || 5;
                page = page || 1;
                const result = await paginationData(sortby, sort, page, limit);
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
        console.log(err)
        next(createError.BadGateway());
    }
};

//insert data
module.exports.insertData = async (req, res, next) => {
        try {
            await insertData(req.body);
            res.json(response.okInsert(req.body));
        } catch (err) {
            next(errorInternal);
        }
};

module.exports.updateData = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const result = await updateData({ id , ...req.body });
        if (result.rowCount == 0){
            next(createError.BadRequest());
        }
        res.json(response.okUpdate(id));
    } catch (err) {
        next(errorInternal);
    }
};

module.exports.deleteData = async (req, res, next) => {
    try {
        const id = +req.params.id;
        await deleteData(id);
        res.json(response.okDelete(id));
    } catch (err) {
        next(errorInternal);
    }
};