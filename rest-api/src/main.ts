import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FallbackExceptionFilter } from "./filter/fallback.filter";
import { HttpExceptionFilter } from "./filter/http.filter";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.setGlobalPrefix('api');
    app.useGlobalFilters(
        new FallbackExceptionFilter(),
        new HttpExceptionFilter()
    );

    await app.listen(9000);
}

bootstrap();

