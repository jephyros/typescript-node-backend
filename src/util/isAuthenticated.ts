//let jwt = require("jsonwebtoken");
import {NextFunction,Request,Response} from 'express';
import jwt,{ VerifyErrors }  from 'jsonwebtoken';



export const verifyJWT = function (req:Request, res:Response, next:NextFunction) {
    let token = extractToken(req);
    let secretKey:string =  process.env.JWT_SECRET_KEY as string;
    jwt.verify(token, secretKey, function (err:VerifyErrors, decoded:any) {
        if (err) {
            res.status(200).json({
                resultcode: "401",
                resultmsg: "Unauthorized Error",
                resultdata: ""
            })
        } else {

            return next();
        }
    });

};


function extractToken(req:Request) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

