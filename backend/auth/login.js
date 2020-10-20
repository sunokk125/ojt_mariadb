const jwt = require('jsonwebtoken');
const db = require('../db/dbCreate');
const sql = require('../db/dbExe');
const SECRET_KEY = "SeCrEtKeY1234";

module.exports={
    loginExe: async function (userId,password){
        let conn;
        try {
            conn = await db.getPoolConnection();
            const queryString =
                "select * from users " +
                "where UserId = " + conn.escape(userId) + 
                " and UserPW = " + conn.escape(password);

            const result = await conn.query(queryString);
            //log('loginExe result : ' + JSON.stringify(result));
            
            if(result.length == 0) {
                throw new Error("No such userId");
            }
            let user = result.shift();
            console.log("user : "+ user);
            // console.log(result.password + "     " + JSON.stringify(user));
            
            const token = jwt.sign({
                No : user.No,
            },SECRET_KEY,{
                expiresIn: '7d'
            })

            return {
                token,
                user
            };
        } catch (error) {
            console.log(`loginExe erorr : ${error}`);
        }
        finally{
            if(conn) db.endPoolConnection(conn);
        }
    },

    checkAuth: async function (token) {
        try {
            //log('checkAuth data : ' + token);

            if (!token) throw new Error('Please Sign in.');

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                console.log("decoded result : " + JSON.stringify(decoded));
                return decoded;  
            } catch (error) {
                console.log(`invalid token error : ${error}`);
                throw error;
            }
             
        } catch (error) {
            console.log(`no token error : ${error}`);
            throw error;
        }
    }


}