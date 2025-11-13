import { IsNotEmpty, IsString } from "class-validator";
import { Match } from "src/common/infraestructure/decorators/Match.decorator";

export class SingUpDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}