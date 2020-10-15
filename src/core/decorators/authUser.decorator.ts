import { createParamDecorator } from "@nestjs/common";

export const AuthUser = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
    
})


