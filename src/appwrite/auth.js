import { Client, Account, ID } from "appwrite";
import config from "../conf/conf";

class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appWriteEndPoint)
        .setProject(config.appWriteProjectId)

        this.account = new Account(this.client)
    }

    createAccount = async({email,password,name}) =>{
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if (userAccount){
                this.login({email,password})
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    login = async({email,password}) =>{
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    getCurrentUser = async() => {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("error in getCurrentUser");
        }
        return null;
    }

    logout = async() =>{
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
 
const authService  = new AuthService();

export default authService;