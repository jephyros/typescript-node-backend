import express,{Application,Request,Response,NextFunction} from 'express';
import * as v1LoginRouter from './routers/login';
import path from 'path';
import morgan from 'morgan';
import moment from 'moment-timezone';
import cors from 'cors';


const accessLogStream = require('file-stream-rotator').getStream({
    filename: path.join(__dirname, 'logs', 'access_%DATE%.log'),
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYYMMDD'
  });
  
  morgan.token('date', (req:Request, res:Response) => {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
  })
  morgan.format('myformat', '[:date] ":method :url" :status :res[content-length] - :response-time ms');
  

const app :Application = express();

// MiddleWare ==========================
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//==========================================


//const v1LoginRouter = require('./routes/login');


//Router
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
  res.send("hellow ts express2.")
});


app.use('/login', v1LoginRouter.router);

app.listen(5000,()=>{
    console.log("Server started.")
});
