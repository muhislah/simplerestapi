const Models = require("../model/categories");
const model = new Models();
const errorCode = require("../helper/errorSql");

class Controller {
    getData = async (req, res) => {
        try {
            const result = await model.getData();
            res.json({
                data: result.rows
            });
        } catch (err) {
            const code = err.code;
            res.json({
                message : "there is an error",
                description : errorCode[code]
            });
        }
    };
    insertData = async (req, res) => {
        try {
            const result = await model.insertData(req.body);
            const {
                rows: data
            } = await model.getData();
            res.json({
                message: "berhasil tambah data",
                data: data
            });
        } catch (err) {
            console.log(err);
        }
    };
    updateData = async (req, res) => {
        try {
            const id = +req.params.id;
            const result = await model.updateData({ id , ...req.body });
            const { rows: data } = await model.getData();
            res.json({
                message: "berhasil update data",
                data: data
            });
        } catch (err) {
            console.log(err);
        }
    };
    deleteData = async (req, res) => {
        try {
            const id = +req.params.id;
            const result = await model.deleteData(id);
            const { rows: data } = await model.getData();
            res.json({
                message: "berhasil menghapus data index ke-"+id,
                data: data
            });
        } catch (err) {
            const code = err.code;
            console.log(err);
            res.json({
                message : "there is an error",
                description : errorCode[code]
            });
        }
    };
}

module.exports = Controller;