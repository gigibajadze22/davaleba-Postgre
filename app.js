import express from 'express'
import productsRouter from './routes/productRoute.js'
import usersRouter from './routes/userRoute.js';
import morgan from 'morgan';
import swaggerUI from "swagger-ui-express"
import specs from './middlewares/swagger.js';

const app = express()
app.use(express.json())


console.log(process.env.NODE_ENV);




if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
    
}



app.use((req,res,next) =>{
    console.log("hello from middleware for dev");
    next()
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use("/api/products", productsRouter)
app.use("/api/users",usersRouter )


export default app