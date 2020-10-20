const {
    gql
} = require("apollo-server-express");

const typeDefs = gql`
    type Query{
        getCorps:[Corps]

        getUsers:[Users]

        getPosts:[Posts]

        getPostsList(Company:Int):[PostsList]

        readPost(No:Int):[ReadPost]
        
        getComents(No:Int):[ComentsList]
        
    }
    type ComentsList{
        Contents:String
        Writer:String
        CreatedDate:String
    }

    type PostsList{
        No:ID!
        Title:String
        Contents:String
        Writer:String
        Counter:Int
        CreatedDate:String
    }
    type ReadPost{
        No:String
        Title:String
        Writer:String
        Contents:String
    }

    type Corps {
        No: ID!
        CorpId: String!
        CorpName: String
        CorpRegNo: String
        CreatedDate: String
        ModifiedDate: String
    }

    type Users {
        No: ID!
        Company: Int!
        UserId: String!
        UserPW:String!
        UserName: String!
        UserEmail:String!
        UserMobile:String!
        UserLevel:Int
        CreatedDate: String
        ModifiedDate: String
    }

    type Posts{
        No:ID!
        Title:String
        Contents:String
        Files:String
        Writer:Int
        Counter:Int
        ParentPost:Int
        Category:String
        CreatedDate: String
        ModifiedDate: String
    }

    type Message {
        token: String
        user: Users
    }
    type CorpUpdateResult{
        resultCount: Int!
    }

    type UserUpdateResult{
        resultCount: Int!
    }

    type PostUpdateResult{
        resultCount: Int!
    }

    type Mutation{
        login(
            userId: String!
            password: String!   
        ): Message

        
        getDecodeToken(token:String!):Users

        createCorp(
            CorpId: String!
            CorpName: String
            CorpRegNo: String
        ):  CorpUpdateResult

        updateCorp(
            No: ID!
            CorpId: String!
            CorpName: String
            CorpRegNo: String
        ): CorpUpdateResult

        deleteCorp(
            No: ID!
        ): UserUpdateResult

        createUser(
            Company: Int!
            UserId: String!
            UserPW:String!
            UserName: String!
            UserEmail:String!
            UserMobile:String!
        ):  UserUpdateResult

        updateUser(
            No: Int!
            Company: Int!
            UserId: String!
            UserPW:String!
            UserName: String!
            UserEmail:String!
            UserMobile:String!
        ): UserUpdateResult

        deleteUser(
            No: ID!
        ): UserUpdateResult

        createPost(
            Title:String
            Contents:String
            Writer:Int
        ):  PostUpdateResult

        updatePost(
            No:ID!
            Title:String
            Contents:String
        ): PostUpdateResult

        deletePost(
            No: ID!
        ): PostUpdateResult

        createComent(
            Contents:String
            Writer:Int
            ParentPost:Int
        ):PostUpdateResult

    }
`
module.exports = [typeDefs];