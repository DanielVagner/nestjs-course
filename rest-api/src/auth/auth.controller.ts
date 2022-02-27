import { Body, ConflictException, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { rejects } from "assert";
import { Model } from "mongoose";
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constant";
import { AuthRepository } from "./repositories/auth.repository";
import { User } from "../../../shared/course";




@Controller("user")
export class AuthController {

    constructor(@InjectModel("User") private userModel: Model<any>, private authDb: AuthRepository) {

    }

    @Post('/login')
    async login(@Body("email") email: string, @Body("password") plainTextPassword: string) {

        const user = await this.userModel.findOne({ email });

        if (!user) {
            console.log("User does not exist on the database");
            return new UnauthorizedException();
        }

        return new Promise((resolve, reject) => {
            password(plainTextPassword).verifyAgainst(
                user.passwordHash,
                (err, verified) => {
                    if (!verified) {
                        console.log("wrong password");
                        reject(new UnauthorizedException());
                    }

                    const authJwtToken = jwt.sign({ email, roles: user.roles }, JWT_SECRET);
                    const role = user.roles;

                    resolve({
                        authJwtToken,
                        role
                    });
                }
            );
        });


    }


    @Post('/register')
    async register(@Body() user: User) {
        password(user.passwordHash).hash((error, hash)=> {
            user.passwordHash = hash;
        });

        const { email } = user;
        const userExist = await this.userModel.findOne({ email });

        if (userExist) {
            throw new ConflictException('User already exist');
        } 

        console.log(user);

           return this.authDb.addUser(user);
        }


    
}