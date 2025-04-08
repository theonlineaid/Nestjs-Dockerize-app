import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe for global validation

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe to automatically validate incoming requests
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // This will automatically transform payloads to the DTO types
    whitelist: true, // This will strip properties that do not exist in the DTOs
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Online store API')
    .setDescription('The Online store API documentation')
    .setVersion('1.0')
    .addBearerAuth() // Optional if you're using JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI will be available at /api

  await app.listen(3000);
}
bootstrap();
