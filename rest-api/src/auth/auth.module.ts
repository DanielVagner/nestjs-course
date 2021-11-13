import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
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
    ]
})
export class AuthModule {

}