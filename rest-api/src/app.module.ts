import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CoursesModule } from "./courses/courses.module";
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from "./constant";
import { AuthModule } from "./auth/auth.module";
import { GetUserMiddleware } from "./middleware/get-user.middleware";
import { CoursesController } from "./courses/controllers/courses.controllers";

@Module({
    imports: [
        AuthModule,
        CoursesModule,
        MongooseModule.forRoot(MONGO_CONNECTION)
    ]
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(GetUserMiddleware)
        .forRoutes(
            CoursesController  
        )
    };
}