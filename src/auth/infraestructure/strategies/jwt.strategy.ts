import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from 'src/auth/domain/interface/jwt-payload.interface';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayloadInterface) {
        const { id } = payload;
        const user = await this.userRepository.findById(id);
        if(!user) throw new UnauthorizedException('Token not valid');

        if(!user.is_active) throw new UnauthorizedException('User is not active, please contact with an admin');
        return user;
    }
}