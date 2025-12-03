import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SigInDto } from "../dto/signin.dto";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import * as bcrypt from 'bcrypt';
import { GenerateJwtUseCase } from "./generate-jwt.use-case";
@Injectable()
export class SignInUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private readonly generateJwtUseCase: GenerateJwtUseCase
    ) {};

    async execute(signInDto: SigInDto) {
        const { email, password } = signInDto;
        const userByEmail = await this.userRepository.findByEmail(email);
        if(!userByEmail) throw new UnauthorizedException('Email or password invalid');
        if(userByEmail.verified_at === null) throw new BadRequestException('User not verified - Please verify your email');
        if(userByEmail.is_active === false) throw new UnauthorizedException('User is inactive');
        console.log({
            password,
            dbPassword: userByEmail.password,
            // compare: bcrypt.compareSync(password, userByEmail.password)
        })
        if(!bcrypt.compareSync(password, userByEmail.password)) throw new UnauthorizedException('Email or password invalid');

        const token = await this.generateJwtUseCase.execute({ id: userByEmail.id });

        return { token };
    }
}