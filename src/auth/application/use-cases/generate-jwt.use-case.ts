import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GenerateJwtUseCase {

    // TODO: Solved injection dependency
    constructor(
        private readonly jwtService: JwtService
    ) {};
    
    async execute(payload: any) {
        return this.jwtService.sign(payload);
    }
}