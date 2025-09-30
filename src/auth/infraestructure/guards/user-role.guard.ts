import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/user/domain/entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { };

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const validRoles: string[] = this.reflector.get<string[]>(META_ROLES, context.getHandler());
        if (!validRoles) return true;
        if (validRoles.length === 0) return true;

        let req = context.switchToHttp().getRequest();
        if(!req) req = GqlExecutionContext.create(context).getContext().req;

        
        const user = req.user as User;
        if (!user) throw new BadRequestException('User not provided');

        const userRoles = user.getPlainRoles();

        for(const role of userRoles) {
            if(validRoles.includes(role)) {
                return true;
            }
        }

        throw new ForbiddenException(
            `User ${user.email} need a valid roles`
        );
    }
}