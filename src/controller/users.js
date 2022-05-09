const bcrypt = require("bcrypt");
const saltRounds = 10;
const { addUser } = require("../model/users");
const response = require("../helper/response");
const createError = require("http-errors");

module.exports.addUser = async (req, res, next) => {
    try {
        const { id , username, password , email } = req.body;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const data = {
            id, username, password : passwordHash, email
        };
        await addUser(data);
        res.json(response.okInsert(data));
    }catch (err) {
        console.log(err);
        next(createError.InternalServerError());
    }
};