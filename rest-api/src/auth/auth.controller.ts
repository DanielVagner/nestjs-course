import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { rejects } from "assert";
import { Model } from "mongoose";
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constant";




@Controller("login")
export class AuthController {

    constructor(@InjectModel("User") private userModel: Model<any>){

    }

    @Post()
    async login(@Body("email") email: string, @Body("password") plainTextPassword: string){
        
        const user = await this.userModel.findOne({email});

        if(!user){
            console.log("User does not exist on the database");
            return new UnauthorizedException();
        }

        return new Promise((resolve, reject)=> {
            password(plainTextPassword).verifyAgainst(
                user.passwordHash,
                (err, verified) => {
                    if (!verified){
                        console.log("wrong password");
                        reject(new UnauthorizedException());   
                    }

                   const authJwtToken = jwt.sign({email, roles: user.roles}, JWT_SECRET);

                   resolve({
                        authJwtToken
                   });
                }
            );
        });
         
       
    }
}