import { IsString } from "class-validator";

export class ValidateMagicLinkDto {
    @IsString()
    @NotE
    token: string;
}