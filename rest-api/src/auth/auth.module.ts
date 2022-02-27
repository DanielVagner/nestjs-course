import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./repositories/auth.repository";
import { UserSchema } from "./user.schema";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: "User", schema: UserSchema
        }
    ])
],
    controllers: [
        AuthController
    ],
    providers: [
        AuthRepository,
    ]
})
export class AuthModule {

}