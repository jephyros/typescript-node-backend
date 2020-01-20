import { Response } from 'express';

import { mysql } from "../util/mysql";
import { logger } from "../util/logger";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';


export const logincheck = mysql.excuteSql(async (con: any, id: string, pwd: string, res: Response) => {

    try {
        const [result] = await con.query('select user_id,user_name,user_email,user_password from bs_account where user_id =?', [id]);
        //console.log("result >>>>>>",result)
        // ...비지니스로직...

        if (pwd == '1234') {
            logger.info('로그인체크 성공 : 아이디 <' + id + '>');
            let token: string = jwt.sign({
                email: 'cis@mail.com'   // 토큰의 내용(payload)
            },
                //'mySceretKey',    // 비밀 키
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: '60m'    // 유효 시간은 60분
                }

            );
            return  {
                resultcode:200,
                resultmsg:"Success",
                token:token
                
            };
        }else{
            logger.info('로그인 실패 : 아이디 <' + id + '>');
            return  {
                resultcode:401,
                resultmsg :"401 Unauthorized"
                
            };
        }


    } catch (error) {

        logger.error("Error: ", error)
        
        return  {
            resultcode:500,
            resultmsg :error
            
        };
    }

});

export const signup = () =>{
    return {
        resultcode :200,
        resultmsg : "Save Success"
    }
};