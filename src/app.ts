import express,{Application,Request,Response,NextFunction} from 'express';
import * as v1LoginRouter from './routers/login';

const app :Application = express();

app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.send("hellow ts express2.")
});

//const v1LoginRouter = require('./routes/login');


//Router
app.use('/login', v1LoginRouter.router);

app.listen(5000,()=>{
    console.log("Server started.")
});
