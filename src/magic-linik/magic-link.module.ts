import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicLinkOrmEntity } from './infraestructure/orm/typeorm/magic-link.orm-entity';
import { MaginLickOrmImpl } from './infraestructure/orm/typeorm/magic-link.orm.impl';
import { CreatemagicLinkUseCase } from './application/use-cases/create-magic-link.use-case';
import { MagicLinkController } from './magic-link.controller';
import { ValidateMagicLinkUseCase } from './application/use-cases/validate-magic-link.use-case';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common';
import { RequestMagicLinkUseCase } from './application/use-cases/request-magic-link.use-case';
import { CommonModule } from 'src/common/common.module';
import { EmailModule } from 'src/email/email.module';

@Module({
	controllers: [MagicLinkController],
	providers: [
		{
			provide: 'MagicLinkRepository',
			useClass: MaginLickOrmImpl
		},
		CreatemagicLinkUseCase,
		ValidateMagicLinkUseCase,
		RequestMagicLinkUseCase
	],
	imports: [
		TypeOrmModule.forFeature([
			MagicLinkOrmEntity
		]),
		forwardRef(() => UserModule),
		CommonModule,
		EmailModule
	],
	exports: [
		TypeOrmModule,
		'MagicLinkRepository',
		CreatemagicLinkUseCase
	]
})
export class MagicLinkModule { }
