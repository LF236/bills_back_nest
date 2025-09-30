import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUserDecorator = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        let request = ctx.switchToHttp().getRequest();
        if(!request) request = GqlExecutionContext.create(ctx).getContext().req;
        const user = request.user;

        if(!user) throw new InternalServerErrorException('User not found - Request');

        return !data ? user: user[data];
    }
)