import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class DemoGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<string[]>('role', context.getHandler());
    console.log(roles);
    if(!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const hasRole = user.roles.some(it => roles.includes(it))
    console.log('hasRole', hasRole);
    return hasRole;
  }
}
