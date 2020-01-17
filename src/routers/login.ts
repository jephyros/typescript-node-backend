import {Router,Request,Response} from 'express';
import {mysql} from "../util/mysql";
//const logger = require('../../utils/logger');
import {logger} from "../util/logger";





export const router:Router = Router();

router.get('',(req:Request,res:Response)=>{
    userget("admin",res).then((result:any)=>{
        
        res.status(200).json({
            resultcode:200,
            resultdata: result
        })

    })    
    .catch((error:any)=>{        
        console.log("error >>>>>>",error)
        res.send("에러발생")
    });

    //res.send("로그인화면")
    

});

router.post('',(req:Request,res:Response)=>{
    userget("admin",res).then((result:any)=>{
        
        res.status(200).json({
            resultcode:200,
            resultdata: result
        })

    })    
    .catch((error:any)=>{        
        console.log("error >>>>>>",error)
        res.send("에러발생")
    });

    //res.send("로그인화면")
    

});

router.get('/signup',(req:Request,res:Response)=>{
    res.send("회원가입처리")
});



const userget = mysql.excuteSql(async (con: any, id: string,res:Response) => {
    
    
    try {
        const [result] = await con.query('select user_id,user_name,user_email from bs_account where user_id =?', [id]);    
        //console.log("result >>>>>>",result)
        // ...비지니스로직...
        logger.info('조회 성공 : 아이디 <' + id + '>');
        
        return result;
    } catch (error) {
        
        console.log("Error: ",error)
        res.send("에러발생")
    }
    

    

    
});

//module.exports = router;