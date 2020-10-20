const sql = require("../db/dbExe");
const login = require('../auth/login');

const resolvers={
    Query:{
        getCorps: async () => {
            let result = await sql.getCorpExe();
            console.log(result);
            return result;
        },
        
        getUsers: async () => {
            let result = await sql.getUserExe();
            console.log(result);
            return result;
        },
        
        getPosts: async () => {
            let result = await sql.getPostExe();
            console.log(result);
            return result;
        },
        getPostsList: async (_,Company) =>{
            let result = await sql.getPostsListExe(Company.Company);
            console.log(result);
            return result;
        },
        readPost: async (_,{
            No
        }) =>{
            let result = await sql.readPostExe(No);
            console.log(result);
            return result;
        },
        getComents: async (_,{
            No
        }) =>{
            let result = await sql.getComentsExe(No);
            console.log(result);
            return result;
        },
    },
    Mutation:{
        login: async function (_, {
            userId,
            password
        }) {
            try {
                console.log("userId : "+userId);
                console.log("userpw : "+password);
                let result = await login.loginExe(userId, password);
                console.log("User Logined with this result : " + JSON.stringify(result));
                if (result === undefined) {
                    throw new Error("no such user");
                }
                return result;
            } catch (error) {
                console.log(`User Login is failed because of this error : ${error}`);
                throw error;
            }
        },
        getDecodeToken: async function (_, {
            token
        }) {
            try {
                console.log("token : "+token);
                let result = await login.checkAuth(token);
                console.log("User decoded with this result : " + JSON.stringify(result));
                

                const user = await sql.getUserByIdExe(result.No);
                
                console.log("resolver user : " + JSON.stringify(user[0]));

                return user[0];
            } catch (error) {
                console.log(`User Login is failed because of this error : ${error}`);
                throw error;
            }
        },
        

        createCorp: async (_, {
            
            CorpId= null,
            CorpName= null,
            CorpRegNo= null
        }) => {
            try {
                let data = {
                    "CorpId": CorpId,
                    "CorpName": CorpName,
                    "CorpRegNo":CorpRegNo,
                };
                console.log("r1");
                const result = await sql.createCorpExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        createUser: async (_, {
            Company= null,
            UserId= null,
            UserPW=null,
            UserName= null,
            UserEmail=null,
            UserMobile=null
        }) => {
            try {
                let data = {
                    "Company": Company,
                    "UserId": UserId,
                    "UserPW":UserPW,
                    "UserName": UserName,
                    "UserEmail":UserEmail,
                    "UserMobile":UserMobile
                };
                console.log("r1");
                const result = await sql.createUserExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        updateUser: async (_, {
            No=null,
            Company= null,
            UserId= null,
            UserPW=null,
            UserName= null,
            UserEmail=null,
            UserMobile=null
        }) => {
            try {
                let data = {
                    "No":No,
                    "Company": Company,
                    "UserId": UserId,
                    "UserPW":UserPW,
                    "UserName": UserName,
                    "UserEmail":UserEmail,
                    "UserMobile":UserMobile
                };
                console.log("r1");
                const result = await sql.updateUserExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        createPost: async (_, {
            Title=null,
            Contents=null,
            //Files=null,
            Writer=null,
            //Category=null
        }) => {
            try {
                let data = {
                    "Title":Title,
                    "Contents":Contents,
                    //"Files":Files,
                    "Writer":Writer
                    //"Counter":Counter,
                    //"ParentPost":ParentPost,
                    //"Category":Category
                };
                console.log("r1");
                const result = await sql.createPostExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        updatePost:async (_, {
            No=null,
            Title=null,
            Contents=null,
            //Files=null,
            //Writer=null,
            //Category=null
        }) => {
            try {
                let data = {
                    "No":No,
                    "Title":Title,
                    "Contents":Contents,
                    //"Files":Files,
                    //"Writer":Writer
                    //"Counter":Counter,
                    //"ParentPost":ParentPost,
                    //"Category":Category
                };
                console.log("r1");
                const result = await sql.updatePostExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`updatePost error: ${error}`);
                throw error;
            }
        },
        deletePost: async (_, {
            No
        }) => {
            try {
                const result = await sql.deletePostExe(No);
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`deletePost error: ${error}`);
                throw error;
            }
        },
        createComent: async(_,{
            //Title=null,
            Contents=null,
            //Files=null,
            Writer=null,
            ParentPost=null,
            //Category=null
            
        }) =>{
            try {
                let data = {
                    //"Title":Title,
                    "Contents":Contents,
                    //"Files":Files,
                    "Writer":Writer,
                    //"Counter":Counter,
                    "ParentPost":ParentPost,
                    //"Category":Category
                };
                console.log("r1");
                const result = await sql.createComentExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
    }
}

module.exports = resolvers;