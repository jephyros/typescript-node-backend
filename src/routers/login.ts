import {Router,Request,Response} from 'express';
import {mysql} from "../util/mysql";


export let router = Router();

router.get('',(req:Request,res:Response)=>{
    userget("cis",res);
    //res.send("로그인화면")
    

});


router.get('/signup',(req:Request,res:Response)=>{
    res.send("회원가입처리")
});



const userget = mysql.connect(async (con: any, id: string,res:Response) => {
    
    const result = await con.query('select * from users', [id]);

    console.log("result >>>>>>",result[0][0].username)
    // ...비지니스로직...
    res.send("로그인 화면 이름 :  " + result[0][0].username)
    return result;

    
});

//module.exports = router;