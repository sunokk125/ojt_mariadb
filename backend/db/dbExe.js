const db = require('./dbCreate');

module.exports = {
    getCorpExe: async function () {
        try {
            const queryString = "select * from corps";
            let results;

            results = await db.exe(queryString);
            console.log('getCorpExe executed');
            return results;
        }
        catch (err) {
            console.log("getCorpExe Error : " + err);
            throw err;
        }
    },
    getUserExe: async function () {
        try {
            const queryString = "select * from users";
            let results;

            results = await db.exe(queryString);
            console.log('getUserExe executed');
            return results;
        }
        catch (err) {
            console.log("getUserExe Error : " + err);
            throw err;
        }
    },
    getPostExe: async function () {
        try {
            const queryString = "select * from posts";
            let results;

            results = await db.exe(queryString);
            console.log('getPostExe executed');
            return results;
        }
        catch (err) {
            console.log("getPostExe Error : " + err);
            throw err;
        }
    },
    getPostsListExe: async function(Company){
        try {
            let queryString =
                "select posts.No as No, posts.Title as Title, posts.Contents as Contents, " +
                "users.UserName as Writer,posts.Counter as Counter,posts.CreatedDate as CreatedDate "+
                "from posts "+
                "join users on users.No = posts.Writer "+
                "where users.Company="+Company+" and posts.ParentPost is null order by No desc";

            let result;
            console.log('getPostsListExe executed');
            result = await db.exe(queryString);
            console.log("join result : " + JSON.stringify(result));
            return result;
        }
        catch (err) {
            console.error("getPostsListExe Error: " + err);
            throw err;
        }
    },
    readPostExe: async function(No){
        try {
            let queryString =
            "select posts.Title as Title, posts.Contents as Contents, " +
            "users.UserName as Writer ,users.No as No "+
            "from posts "+
            "join users on users.No = posts.Writer "+
            "where posts.No="+No;

            let result;
            console.log('readPostExe executed');
            result = await db.exe(queryString);
            console.log("db result : " + JSON.stringify(result));
            return result;
        }
        catch (err) {
            console.error("readPostExe Error: " + err);
            throw err;
        }
    },
    getUserByIdExe: async function (no = null) {
        try {
            let queryString =
                "select * " +
                "from users ";

            if (no) {
                queryString +=
                    "where No = " + no;
            }


            let result;
            console.log('getUserByIdExe executed');
            result = await db.exe(queryString);
            console.log("db result : " + JSON.stringify(result));
            return result;
        }
        catch (err) {
            console.error("getUserByIdExe Error: " + err);
            throw err;
        }
    },
    createCorpExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into corps (CorpId,CorpName,CorpRegNo) " +
                "values (" +
                conn.escape(data['CorpId'])+","+
                conn.escape(data['CorpName'])+","+
                conn.escape(data['CorpRegNo'])+
                ")";
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("createUserExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    createUserExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into users (Company,UserId,UserName,UserPW,UserEmail,UserMobile) " +
                "values (" +
                conn.escape(data['Company'])+","+
                conn.escape(data['UserId'])+","+
                conn.escape(data['UserName'])+","+
                conn.escape(data['UserPW'])+","+
                conn.escape(data['UserEmail'])+","+
                conn.escape(data['UserMobile'])+
                ")";
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("createUserExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    updateUserExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "update users " +
                "set Company = " + conn.escape(data['Company']) + "," +
                "UserId = " + conn.escape(data['UserId']) + "," + 
                "UserName = " + conn.escape(data['UserName']) + "," + 
                "UserPW = " + conn.escape(data['UserPW']) + "," + 
                "UserEmail = " + conn.escape(data['UserEmail']) + "," + 
                "UserMobile = " + conn.escape(data['UserMobile']) + 
                " where No = " + conn.escape(data['No']);
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("updateUserExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    createPostExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into posts (Title,Contents,Writer) " +
                "values (" +
                conn.escape(data['Title'])+","+
                conn.escape(data['Contents'])+","+
                //conn.escape(data['Files'])+","+
                conn.escape(data['Writer'])+//","+
                //conn.escape(data['Counter'])+","+
                //conn.escape(data['ParentPost'])+","+
                //conn.escape(data['Category'])+
                ")";
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("createUserExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    updatePostExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "update posts " +
                "set Title = " + (data["Title"]) + "," +
                "Contents = " + (data["Contents"]) + 
                " where No = " + data["No"];
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("updatePostExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    deletePostExe:async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "delete from posts " +
                " where No = " + data;
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("deletePostExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    createComentExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into posts (Contents,Writer,ParentPost) " +
                "values (" +
                //conn.escape(data['Title'])+","+
                conn.escape(data['Contents'])+","+
                //conn.escape(data['Files'])+","+
                conn.escape(data['Writer'])+","+
                //conn.escape(data['Counter'])+","+
                conn.escape(data['ParentPost'])+//","+
                //conn.escape(data['Category'])+
                ")";
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("createComentrExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },

    getComentsExe: async function(data){
        try {
            console.log(data);
            let queryString =
                "select posts.No as No, posts.Contents as Contents, " +
                "users.UserName as Writer,posts.CreatedDate as CreatedDate "+
                "from posts "+
                "join users on users.No = posts.Writer "+
                "where posts.ParentPost = "+data;

            let result;
            console.log('getComentsListExe executed');
            result = await db.exe(queryString);
            console.log("join result : " + JSON.stringify(result));
            return result;
        }
        catch (err) {
            console.error("getPostsListExe Error: " + err);
            throw err;
        }
    }

}