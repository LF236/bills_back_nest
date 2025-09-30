import { applyDecorators, ExecutionContext, Injectable, UseGuards } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { RoleProtectedDecorator } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";

@Injectable()
export class GplAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}

export function GplAuthDecorator(...roles: string[]) {
    return applyDecorators(
        RoleProtectedDecorator(...roles),
        UseGuards(GplAuthGuard, UserRoleGuard)
    );
}