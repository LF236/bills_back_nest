import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminResendValidationEmailUseCase } from './application/use-cases/admin-resend-validation-email.use-case';
import { ParseUUIDPipe } from '@nestjs/common';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { Audit } from 'src/logs/infrastructure/decorators/audit.decorator';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';
import { User } from 'src/user/domain/entities/user.entity';
import { AdminResendRenewEmailGraphqlType } from './interfaces/graphql/admin-resend-renew-email.graphql-type';

@Resolver(() => {})
export class MagicLinkResolver {
  constructor(
    private readonly adminResendValidationEmailUseCase: AdminResendValidationEmailUseCase
  ) {};

  @Mutation(() => AdminResendRenewEmailGraphqlType)
  @GplAuthDecorator('admin', 'default_user')
  @Audit({
    module: 'magic_link',
    action: 'Admin Resend Validation Email',
    resource: 'MagicLinkResolver',
    description: 'Admin Resend Validation Email'
  })
  async adminResendValidationEmail(
    @Args('userId', { type: () => String }, ParseUUIDPipe) userId: string,
    @GetUserDecorator() user: User
    
  ) {
    return this.adminResendValidationEmailUseCase.execute(userId, user);
  }
}