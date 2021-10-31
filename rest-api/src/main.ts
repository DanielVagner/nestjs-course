import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FallbackExceptionFilter } from "./filter/fallback.filter";
import { HttpExceptionFilter } from "./filter/http.filter";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ValidationFilter } from "./filter/validation.filter";
import { ValidationException } from "./filter/validation.exception";

mongoose.set('useFindAndModify', false);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Swagger rest api documentation')
        .setDescription('The rest API description')
        .setVersion('1.0')
        .addTag('courses')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalFilters(
        new FallbackExceptionFilter(),
        new HttpExceptionFilter(),
        new ValidationFilter()
    );


    app.useGlobalPipes(new ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: (errors: ValidationError[])=>{
            const message = errors.map(
                error => `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(',')}`
            );

            return new ValidationException(message);
        }
    }));

    app.setGlobalPrefix('api');

    await app.listen(9000);
}

bootstrap();

