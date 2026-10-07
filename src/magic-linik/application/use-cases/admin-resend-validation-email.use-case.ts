import { Inject, Injectable } from '@nestjs/common';
import { UuidGeneratorPort } from 'src/common/domain/port/uuid-generator.port';
import { ApplicationException } from 'src/exceptions/application.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { TooManyRequestsException } from 'src/exceptions/too-many-request.exception';
import { LogsService } from 'src/logs/logs.service';
import { MagicLinkRepositoryPort } from 'src/magic-linik/domain/ports/magic-link-repository.port';
import { RateLimiterPort } from 'src/shared/infrastructure/rate-limiter/domain/ports/rate-limiter.port';
import { RATE_LIMITER } from 'src/shared/infrastructure/rate-limiter/infrastructure/constants/rate-limiter.constants';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';
import { CreatemagicLinkUseCase } from './create-magic-link.use-case';
import { SendValidationEmailUseCase } from 'src/email/application/use-cases/send-validation-email.use-case';
import { Timer } from 'src/common/domain/timing/timer';

@Injectable()
export class AdminResendValidationEmailUseCase {
  private static readonly RATE_LIMIT_KEY_BY_ADMIN_PREFIX = 'rate_limit:admin_resend_validation_email:admin';
  private static readonly USER_RATE_LIMIT_MAX = 5;
  private static readonly ADMIN_RATE_LIMIT_MAX = 20;
  private static readonly RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
  private static readonly TOKEN_EXPIRY_MS = 15 * 60 * 1000;

  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject(RATE_LIMITER)
    private readonly rateLimiteService: RateLimiterPort,
    @Inject('MagicLinkRepository')
    private readonly magicLinkRepository: MagicLinkRepositoryPort,
    private readonly logService: LogsService,
    @Inject('UuidGeneratorPort')
    private readonly uuidGenerator: UuidGeneratorPort,
    private readonly createMagicLinkUseCase: CreatemagicLinkUseCase,
    private readonly sendValidationEmailUseCase: SendValidationEmailUseCase,
  ) {};

  private async countRecentTokensByUserId(userId: string) : Promise<number> {
    const since = Date.now() - AdminResendValidationEmailUseCase.TOKEN_EXPIRY_MS;
    const count = await this.magicLinkRepository.countByUserIdSince(userId, since);
    return count;
  }

  private async countRecentTokensByAdminId(adminId: string) : Promise<void> {
    await this.rateLimiteService.check(
      `${AdminResendValidationEmailUseCase.RATE_LIMIT_KEY_BY_ADMIN_PREFIX}:${adminId}`,
      AdminResendValidationEmailUseCase.ADMIN_RATE_LIMIT_MAX,
      AdminResendValidationEmailUseCase.RATE_LIMIT_WINDOW_MS / 1000
    )
  }

  private async saveLog(user_id: string | null, user_name: string = '', time: number = 0, payload: any) {
    await this.logService.log({
      user_id: user_id,
      user_name: user_name,
      action: 'Admin Resend Validation Email',
      module: 'magic_link',
      resource: 'AdminResendValidationEmailUseCase',
      description: 'Admin requested to resend validation email for a user',
      result: 'success',
      duration: time
    }, { ...payload })
  }

  async execute(userId: string, user: User) : Promise<{message: string}> {
    const timer = Timer.create();
    const findUser = await this.userRepository.findById(userId);

    if(!findUser) {
      throw new NotFoundException('User not found');
    }

    if(findUser.verified_at && findUser.is_active === true) {
      throw new ApplicationException('This user is already verified');
    }

    const recenUserCount = await this.countRecentTokensByUserId(userId);
    
    if(recenUserCount >= AdminResendValidationEmailUseCase.USER_RATE_LIMIT_MAX) {
      throw new TooManyRequestsException('User has exceeded the limit of token requests. Please try again later.');
    }

    const token = await this.createMagicLinkUseCase.execute({
      user_id: findUser.getId(),
      expires_at: new Date(Date.now() + 1000 * 60 * 15),
      token: this.uuidGenerator.generate()
    }, findUser);

    await this.sendValidationEmailUseCase.execute(
      findUser.getEmail(),
      'Renew your validation token',
      '',
      'validate-email.template.js',
      token.getToken(),
      findUser
    );

    await this.countRecentTokensByAdminId(user.getId());

    await this.saveLog(user.getId(), user.getUserName(), timer.stop(), {
      token: token.getToken(),
      user_id: findUser.getId(),
      user_email: findUser.getEmail()
    });

    return {
      message: 'A new validation token has been sent to the user\'s email'
    }
  }
}