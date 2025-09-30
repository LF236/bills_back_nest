import { applyDecorators, UseGuards } from "@nestjs/common";
import { RoleProtectedDecorator } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guard";

export function AuthDecorator(...roles: string[]) {
    return applyDecorators(
        RoleProtectedDecorator(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    );
}