import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CommandModule, CommandService } from "nestjs-command";

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule, {
		logger: false
	});


	await app.select(CommandModule).get(CommandService).exec();

	await app.close();
}

bootstrap();
