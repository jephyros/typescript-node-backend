import {Router,Request,Response} from 'express';

export let router = Router();

router.get('',(req:Request,res:Response)=>{
    res.send("로그인처리")
});


router.get('/signup',(req:Request,res:Response)=>{
    res.send("회원가입처리")
});



//module.exports = router;