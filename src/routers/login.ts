import { Router, Request, Response } from 'express';
import { logger } from "../util/logger";
import { logincheck,signup } from '../controller/login';

export const router: Router = Router();

//로그인 (토큰 받아오기)
router.get('', (req: Request, res: Response) => {
    logincheck("admin", "1234", res).then((result: any) => {
        res.status(200).json(result);
    })
    .catch((error: any) => {
        logger.error("로그인 체크 에러:" + error)
        res.status(500).json({
            resultcode:"500",
            resultmsg: error
        
        });
    });

});


router.get('/signup', (req: Request, res: Response) => {
    let result = signup();    
    res.status(200).json({
        result
    })
});
