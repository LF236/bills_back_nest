import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.useGlobalPipes(
		new ValidationPipe({
			//whitelist: true,
			//transform: true,
			//forbidNonWhitelisted: true,
			exceptionFactory: (errors: ValidationError[]) => {
			    const formattedErrors = errors.reduce((acc, err) => {
					if(err.constraints) {
						acc[err.property] = Object.values(err.constraints);
					}

					if(err.children && err.children.length) {
						const childrenErrors = err.children.reduce((childAcc, childError) => {
							if(childError.constraints) {
								childAcc[childError.property] = Object.values(childError.constraints);
							}
							return childAcc;
						}, {});

						acc[err.property] = {
							...acc[err.property],
							...childrenErrors
						}
					}
					return acc;
				}, {} as Record<string, string[]>);

				return new BadRequestException({
					statusCode: 400,
					message: 'Bad Request',
					errors: formattedErrors,
					defails: formattedErrors
				})
			},
		})
	)

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
