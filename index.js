require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const productRouter = require("./src/route/products");
const categoriesRouter = require("./src/route/categories");
const usersRouter = require("./src/route/users");

const port = process.env.port || 3000;


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/categories", categoriesRouter);
app.use("/auth", usersRouter);

app.use((err, req, res, next)=> {
    if (err){
        res.status(err.status).json({
            status : err.statusCode,
            error : true,
            message : err.message
            
        });
        res.end();
    }else{
        next();
    }
});

app.use((req,res) => {
    res.status(404).json({
        status : 404,
        error : true,
        message : "Page Not Found"
    });
}); 

app.listen(port,()=> {
    console.log("app running on port 3000");
});