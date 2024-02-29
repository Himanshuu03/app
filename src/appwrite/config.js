import { Client, Databases,Storage,Query, ID } from "appwrite";
import config from "../conf/conf";

class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appWriteEndPoint)
        .setProject(config.appWriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    createPost = async({title,content,slug,image,status,userId})=>{
        try {
            return await this.databases.createDocument(config.appWriteDataBaseId,config.appWriteCollectioId,slug,{
                title,content,image,status,userId
            })
        } catch (error) {
            console.log("App Write Data Base Error (Create)",error);    
        }
    }

    updatePost = async(slug,{title,content,image,status}) => {
        try {
            return await this.databases.updateDocument(config.appWriteDataBaseId,config.appWriteCollectioId,slug,{
                title,content,image,status
            })
        } catch (error) {
            console.log("App Write Data Base Error (Update)",error);    
        }
    }

    deletePost = async(slug) =>{
        try {
            await this.databases.deleteDocument(config.appWriteDataBaseId,config.appWriteCollectioId,slug);
            return true;
        } catch (error) {
            console.log("App Write Data Base Error (Delete)",error);    
        }
    }

    getPost = async(slug) =>{
        try {
            return await this.databases.getDocument(config.appWriteDataBaseId,config.appWriteCollectioId,slug);
        } catch (error) {
            console.log("App Write Data Base Error (Get-Post)",error);    
            return false;
        }
    }

    listPosts = async() =>{
        try {
            return await this.databases.listDocuments(config.appWriteDataBaseId,config.appWriteCollectioId,[
                Query.equal("status","active")
            ])
        } catch (error) {
            console.log("App Write Data Base Error (Get-Posts)",error);    
            return false;
        }
    }

    uploadDocument = async(file) =>{
        try{
            return await this.bucket.createFile(config.appWriteBucketId,ID.unique(),file);
        }catch(error){
            console.log("App Write Storage Error (upload)",error);    
            return false;
        }
    }

    deleteDocument = async(fileId) =>{
        try{
            await this.bucket.deleteFile(config.appWriteBucketId,file);
            return true
        }catch(error){
            console.log("App Write Storage Error (upload)",error);    
            return false;
        }
    }

    filePreview = async(fileId) =>{
        try {
            return await this.bucket.getFilePreview(config.appWriteBucketId,fileId)
        } catch (error) {
            
        }
    }
}