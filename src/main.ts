import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: console,
	});

	const config = new DocumentBuilder()
		.setTitle('Kid - Activities API')
		.setDescription('The Kid - Activities API description')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}

bootstrap();
