import { Inject, Injectable } from '@nestjs/common';
import { CryptoGeneratorPort } from 'src/common/domain/port/crypto-generator.port';
import { Timer } from 'src/common/domain/timing/timer';
import { SendEmailRenewPasswordUseCase } from 'src/email/application/use-cases/send-email-renew-password.use-case';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { LogsService } from 'src/logs/logs.service';
import { RateLimiterPort } from 'src/shared/infrastructure/rate-limiter/domain/ports/rate-limiter.port';
import { RATE_LIMITER } from 'src/shared/infrastructure/rate-limiter/infrastructure/constants/rate-limiter.constants';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';

@Injectable()
export class ResetPasswordUserCase {
 
  private static readonly USER_RATE_LIMIT_KEY = 'admin_reset_password_user';
  private static readonly ADMIN_RATE_LIMIT_KEY = 'admin_reset_password_admin';
  private static readonly USER_RATE_LIMIT_MAX = 3;
  private static readonly ADMIN_RATE_LIMIT_MAX = 10;
  private static readonly RATE_LIMIT_WINDOW = 3600;

  constructor(
    private readonly logService: LogsService,
    @Inject('UserRepository')
    private readonly userService: IUserRepository,
    @Inject('CryptoGeneratorPort')
    private readonly crytoGenerate: CryptoGeneratorPort,
    private readonly sendEmailRenewPasswordUseCase: SendEmailRenewPasswordUseCase,
    @Inject(RATE_LIMITER)
    private readonly rateLimiterService: RateLimiterPort
  ) {};

  async saveLog(userId: string, userName: string, duration: number = 0, payload: any) {
    await this.logService.log({
      user_id: userId,
      user_name: userName,
      action: 'Renew password of a user',
      module: 'User',
      resource: 'ResetPasswordUserCase',
      description: 'Renew password of a user',
      result: 'success',
      duration: duration
    }, { ...payload });
  }

  async execute(userId: string, user: User) {
    
    await this.rateLimiterService.check(
      `${ResetPasswordUserCase.USER_RATE_LIMIT_KEY}:${userId}`,
      ResetPasswordUserCase.USER_RATE_LIMIT_MAX,
      ResetPasswordUserCase.RATE_LIMIT_WINDOW,
      'You have reached the limit of password reset attempts for this user. Please try again later.'
    );

    await this.rateLimiterService.check(
      `${ResetPasswordUserCase.ADMIN_RATE_LIMIT_KEY}:${user.getId()}`,
      ResetPasswordUserCase.ADMIN_RATE_LIMIT_MAX,
      ResetPasswordUserCase.RATE_LIMIT_WINDOW,
      'You admin account has reached the limit of password reset attempts. Please try again later.'
    );

    const timer = Timer.create();
    const userToChange = await this.userService.findById(userId);
    if(!userToChange) {
      throw new NotFoundException('User with id: ' + userId + ' not found');
    }
    const newPassword = this.crytoGenerate.generatePassword(16);
    
    await this.sendEmailRenewPasswordUseCase.execute(
      userToChange.getEmail(),
      'Reset Password',
      '',
      'reset-password-email.template.js',
      newPassword,
      user
    );

    const hashedPassword = this.crytoGenerate.generateHash(newPassword, 10);

    await this.userService.updatePassword(hashedPassword, userId);

    await this.saveLog(user.id, user.getUserName(), timer.stop(), {
      emailToChagePassword: userToChange.getEmail(),
      userIdToChangePassword: userToChange.getId()
    });
    return true;
  }
}