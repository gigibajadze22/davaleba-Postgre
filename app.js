import express from 'express'
import productsRouter from './routes/productRoute.js'
import usersRouter from './routes/userRoute.js';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express"
import specs from './middlewares/swagger.js';


const app = express()
app.use(express.json())
app.use('/uploads',express.static('uploads'))

console.log(process.env.NODE_ENV);




if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
    
}



app.use((req,res,next) =>{
    console.log("hello from middleware for dev");
    next()
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs,{
    explorer: true,
}))
app.use("/api/products", productsRouter)
app.use("/api/users",usersRouter )


export default app