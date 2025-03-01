import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './infrastructure/config/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Job Offers API')
    .setDescription('API documentation for job offers')
    .addTag('job-offers')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Server running at http://localhost:3000`);
  console.log(`Swagger Docs available at http://localhost:3000/api/docs`);
}
bootstrap();
