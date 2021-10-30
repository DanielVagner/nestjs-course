import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FallbackExceptionFilter } from "./filter/fallback.filter";
import { HttpExceptionFilter } from "./filter/http.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalFilters(
        new FallbackExceptionFilter(), 
        new HttpExceptionFilter()
        );

    await app.listen(9000);
}

bootstrap();

