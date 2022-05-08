const express = require('express')
const app = express()
const productRouter = require('./src/route/products')
const categoriesRouter = require('./src/route/categories')

app.use(express.json());

app.use('/products', productRouter)
app.use('/categories', categoriesRouter)

app.get('/',(req,res)=>{
    res.json({
        message : "welcome to my app"
    })
})

app.listen(3000,()=> {
    console.log('app running on port 3000')
})