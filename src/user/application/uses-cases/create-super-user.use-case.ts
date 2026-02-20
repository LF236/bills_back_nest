import { Inject, Injectable } from '@nestjs/common';
import { IRolRepository } from 'src/rols/domain/interface/irol.repository';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';

@Injectable()
export class CreateSuperUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('RolRepository')
    private readonly rolRepository: IRolRepository

  ) {};

  async execute(email: string, password: string, name: string) {
    const exists = await this.userRepository.findByEmail(email);
    if (exists) {
      throw new Error("User already exists with this email");
    }

    const findByName = await this.userRepository.findByName(name);
    if (findByName) {
      throw new Error("User already exists with this name");
    }

    let role_ids : string[] = [];
    const admin_role = await this.rolRepository.findByName('super_admin');
    if(!admin_role) throw new Error("Admin role not found. Please create a role named 'admin' before creating a superuser.");
    if(admin_role) role_ids.push(admin_role.getId());

    const createdUser = await this.userRepository.save({
      email,
      password,
      name,
      confirmPassword: password
    }, role_ids);
    if(!createdUser) throw new Error("Failed to create superuser");
    return createdUser.getUserEntity();
  }
}