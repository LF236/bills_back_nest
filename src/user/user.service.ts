import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { RolsService } from 'src/rols/rols.service';
import { Rol } from 'src/rols/entities/rol.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		private readonly rolsService: RolsService
	) {};


	async create(createUserInput: CreateUserInput, isSuper = false) : Promise<User> {
		// Check if the user already exists	
		const existignUser = await this.findOneByEmal(createUserInput.email);
		if (existignUser) {
			throw new BadRequestException(`User with email ${createUserInput.email} already exists.`);
		}

		let defaultRole : Rol | null = null;
		if(!isSuper) {
			defaultRole = await this.rolsService.findOneByName('default_user');
		} else {
			defaultRole = await this.rolsService.findOneByName('super_admin');
		}
		const user = this.userRepository.create({
			...createUserInput,
			password: hashSync(createUserInput.password, 10),
			roles: defaultRole ? [defaultRole] : []
		});
		return this.userRepository.save(user);
	}

	async findOneByEmal(email: string) : Promise<User | null> {
		return this.userRepository.findOneBy({ email });
	}

}
