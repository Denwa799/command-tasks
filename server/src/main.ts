import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Приложение для контроля задач команды')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addTag('Denwa')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`server started on POST ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();