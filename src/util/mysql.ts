
const promiseMysql = require('mysql2/promise');

import * as dotenv from 'dotenv';


dotenv.config({    
    path: '.env'
});

const pool = promiseMysql.createPool({
    connectionLimit : 3,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    port: process.env.DB_PORT,
    
});

export module mysql {
    export const excuteSql = (fn:any) =>  async (...args:any) => {
        /* DB 커넥션을 한다. */
        try{
            console.log('>>>>>>>>>>>>>>>>>',process.env.ACI_DATASOURCE_HOST)
            const con: any = await pool.getConnection();
            

            /* 로직에 con과 args(넘겨받은 paramter)를 넘겨준다. */
            const result = await fn(con, ...args).catch((error: any) => {
                /* 에러시 con을 닫아준다. */
                con.connection.release();
                throw error;
            });
            /* con을 닫아준다. */
            con.connection.release();
            return result;
        }catch(e2){
            throw e2;//new Error("pool.getConnection : " + e2);
        }
    
        
    };

    export const excuteSqlTx = (fn:any) => async (...args: any) => {
        /* DB 커넥션을 한다. */        
        try{
            const con: any = await pool.getConnection();
            /* 트렌젝션 시작 */
            await con.connection.beginTransaction();
            /* 비지니스 로직에 con을 넘겨준다. */
            const result = await fn(con, ...args).catch(async (error: any) => {
                /* rollback을 진행한다. */
                await con.rollback();
                /* 에러시 con을 닫아준다. */
                con.connection.release();
                throw error;
            });
            /* commit을 해준다. */
            await con.commit();
            /* con을 닫아준다. */
            con.connection.release();
            return result;
        }catch(e2){
            throw e2;//new Error("pool.getConnection : " + e2);
        }
    }
}