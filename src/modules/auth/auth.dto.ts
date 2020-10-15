import { IsString } from "class-validator";

export class LoginDto {
    @IsString()
    private readonly username: string;
    @IsString()
    private readonly password: string;

}