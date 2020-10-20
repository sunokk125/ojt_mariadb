const mdb = require("mariadb");
const config = require("./dbConfig");

const pool = mdb.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port:config.port
});

module.exports={
    exe: async function(queryStatement) {
        let conn;
        let result;

        try {
            try{
                conn = await this.getPoolConnection();
            }
            catch(err){
                console.log('connection error : ' + err);
                throw err;
            }

            try{
                result = await conn.query(queryStatement);
                //log('query statement : ' + queryStatement );
                return result;
            }catch(err){
                console.log('conn.query error : ' + err);
                throw err;
            }
        } 
        catch (err){
            console.log('exe error : ' + err);
            throw err; 
        } 
        finally{
            try{
                if(conn) await this.endPoolConnection(conn);
            }
            catch(err){
                console.log('this.endPoolConnection error : ' + err );
                throw err;
            }
        }
    },

    getPoolConnection: async function () {
        let conn;
        try {
            conn = await pool.getConnection();
            console.log("connection succeed");
            return conn;
        } catch (err) {
            console.log("pool.getConnection error : " + err);
            throw err;
        }
    },

    endPoolConnection: async function (conn) {
        try {
            if (conn) {
                console.log("connection end");
                await conn.end();
            }
        } catch (err) {
            console.log("conn.end error : " + err);
            throw err;
        }
    }
}