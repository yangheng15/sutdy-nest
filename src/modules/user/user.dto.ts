import { IsString } from "class-validator";

export class UserDto {
    @IsString()
    private readonly username: string;
    @IsString()
    private readonly password: string;
}

export class UpdatePasswordDto {
    @IsString()
    readonly username: string;
    @IsString()
    readonly password: string;
    @IsString()
    readonly newPassword: string;
}