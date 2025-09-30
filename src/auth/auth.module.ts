import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { SignInUseCase } from './application/use-cases/signin.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenerateJwtUseCase } from './application/use-cases/generate-jwt.use-case';

@Module({
	controllers: [AuthController],
	providers: [
		// UseCases
		SignInUseCase,
		GenerateJwtUseCase
	],
	imports: [
		UserModule,
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		JwtModule.registerAsync({
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: ( configService: ConfigService ) => ({
				secret: configService.get<string>('JWT_SECRET') || 'default',
				signOptions: {
					expiresIn: '2h'
				}
			})
		})
	],
	exports: [ JwtModule, PassportModule, JwtModule ]
})
export class AuthModule {}
