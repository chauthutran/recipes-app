import { MongooseValidationFilter } from './mongoose-validation.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.useGlobalFilters(new MongooseValidationFilter());
    
    app.enableCors({
        origin: 'http://localhost:5173', // Our Vue frontend's URL
        // credentials: true,               // if we're using cookies or auth headers
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
