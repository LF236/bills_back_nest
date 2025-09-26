import { Module } from '@nestjs/common';
import { MagicLinikController } from './magic-linik.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicLinkOrmEntity } from './infraestructure/orm/typeorm/magic-link.orm-entity';
import { MaginLickOrmImpl } from './infraestructure/orm/typeorm/magic-link.orm.impl';
import { CreatemagicLinkUseCase } from './application/use-cases/create-magic-link.use-case';

@Module({
	controllers: [MagicLinikController],
	providers: [
		{
			provide: 'MagicLinkRepository',
			useClass: MaginLickOrmImpl
		},
		CreatemagicLinkUseCase
	],
	imports: [
		TypeOrmModule.forFeature([
			MagicLinkOrmEntity
		])
	],
	exports: [
		TypeOrmModule,
		'MagicLinkRepository',
		CreatemagicLinkUseCase
	]
})
export class MagicLinkModule { }
