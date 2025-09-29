import { Injectable } from "@nestjs/common";
import { SigInDto } from "../dto/signin.dto";

@Injectable()
export class SignInUseCase {
    constructor(
    ) {};

    async execute(signInDto: SigInDto) {
        const { email, password } = signInDto;
        console.log(email, password);
        throw new Error('Method not implemented.');
    }
}