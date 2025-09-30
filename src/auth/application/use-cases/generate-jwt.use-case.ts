import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadInterface } from "src/auth/domain/interface/jwt-payload.interface";

@Injectable()
export class GenerateJwtUseCase {

    // TODO: Solved injection dependency
    constructor(
        private readonly jwtService: JwtService
    ) {};
    
    async execute(payload: JwtPayloadInterface) {
        return this.jwtService.sign(payload);
    }
}