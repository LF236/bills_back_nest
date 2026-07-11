import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SigInDto } from "../dto/signin.dto";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import * as bcrypt from 'bcrypt';
import { GenerateJwtUseCase } from "./generate-jwt.use-case";
import { LogsService } from "src/logs/logs.service";
import { Timer } from "src/common/domain/timing/timer";
@Injectable()
export class SignInUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private readonly generateJwtUseCase: GenerateJwtUseCase,

        private readonly logService: LogsService
    ) {};


    async saveLog(user_id: string, user_name: string, duration: number =0) {
        await this.logService.log({
            user_id,
            user_name,
            action: 'Auth Login',
            module: 'Auth',
            resource: 'SignInUseCase',
            description: 'User-Login',
            result: 'success',
            message_error: '',
            duration: duration
        });
    }

    async execute(signInDto: SigInDto) {
        const timer = Timer.create();
        const { email, password } = signInDto;
        const userByEmail = await this.userRepository.findByEmail(email);
        if(!userByEmail) throw new UnauthorizedException('Email or password invalid');
        if(userByEmail.verified_at === null) throw new BadRequestException('User not verified - Please verify your email');
        if(userByEmail.is_active === false) throw new UnauthorizedException('User is inactive');
        if(!bcrypt.compareSync(password, userByEmail.password)) throw new UnauthorizedException('Email or password invalid');

        const token = await this.generateJwtUseCase.execute({ id: userByEmail.id });
        await this.saveLog(userByEmail.id, userByEmail.name, timer.stop());
        return { token };
    }
}