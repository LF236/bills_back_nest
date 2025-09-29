import { IsNotEmpty, IsString } from "class-validator";

export class RequestNewTokenDto {
    @IsString()
    @IsNotEmpty()
    email: string;    
}