import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { RolOrmEntity } from "./rol.orm-entity";
import { Repository } from "typeorm";
import { CreateRolInput } from "src/rols/dto/create-rol.input";
import { Rol } from 'src/rols/domain/entities/rol.entity';
import { Permission } from "src/permissions/domain/entities/permission.entity";
import { UpdateRolInput } from "src/rols/dto/update-rol.input";
import { PermissionOrmEntity } from "src/permissions/infrastructure/orm/typeorm/permission.orm-entity";
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";

@Injectable()
export class RolOrmRepositoryImpl implements IRolRepository {
    constructor(
        @InjectRepository(RolOrmEntity)
        private readonly repo: Repository<RolOrmEntity>
    ) {};
    
    async create(createRolInput: CreateRolInput): Promise<Rol> {
        const { name, description, is_active, permissions } = createRolInput;
        let newRol = this.repo.create({
            name,
            description,
            is_active,
            permissions: permissions?.map( id => ({ id }) ) || []
        });

        newRol = await this.repo.save(newRol);

        return Rol.createFromObj(newRol);
    }

    async get(pagionationArgs: PaginationArgs, searchArgs: SearchArgs) : Promise<Rol[]> {
        const query = this.repo.createQueryBuilder('rol')
            .leftJoinAndSelect('rol.permissions', 'permission')
            .where('rol.deleted_at IS NULL')
            .andWhere('(permission.is_active = true OR permission.id IS NULL)');
            
        if(searchArgs.search) {
            query.andWhere('(rol.name ILIKE :search OR rol.description ILIKE :search)', { search: `%${searchArgs.search.trim()}%` });
        }

        query.take(pagionationArgs.limit);
        query.skip(pagionationArgs.offset);

        const rols = await query.getMany();

        if(rols && rols.length > 0) {
            const rolsEntities = rols.map( rol => {
                const rolEntity = Rol.createFromObj(rol);
                if(rol.permissions && rol.permissions.length > 0) {
                    rolEntity.setPermissions(
                        rol.permissions.map( permission => Permission.createFromObj(permission) )
                    );
                }
                return rolEntity;
            });
            return rolsEntities;
        }
        return [];
    }

    async count(searchArgs: SearchArgs) : Promise<number> {
        const query = this.repo.createQueryBuilder('rol');

        if(searchArgs.search) {
            query.where('(rol.name ILIKE :search OR rol.description ILIKE :search)', { search: `%${searchArgs.search.trim()}%` });
        }

        const count = await query.getCount();
        return count || 0;
    }

    async findOne(id: string) : Promise<Rol | null> {
        const query = this.repo.createQueryBuilder('rol')
            .leftJoinAndSelect('rol.permissions', 'permission')
            .where('rol.id = :id', { id })
            .andWhere('rol.deleted_at IS NULL')
            .andWhere('(permission.is_active = true OR permission.id IS NULL)');

        const rol = await query.getOne();

        if(!rol) return null;

        const rolEntity = Rol.createFromObj(rol);
        if(rol.permissions && rol.permissions.length > 0) {
            rolEntity.setPermissions(
                rol.permissions.map( permission => Permission.createFromObj(permission) )
            );
        }

        return rolEntity;
    }

    async update(updateRolInput: UpdateRolInput) : Promise<Rol> {
        const rol = (await this.repo.findOne({ where: { id: updateRolInput.id } }))!;

        if(updateRolInput.name) {
            rol.name = updateRolInput.name;
        }

        if(updateRolInput.description) {
            rol.description = updateRolInput.description;
        }

        if(updateRolInput.is_active !== undefined) {
            rol.is_active = updateRolInput.is_active;
        }
        
        if(updateRolInput.permissions && updateRolInput.permissions.length > 0) {
            rol.permissions = updateRolInput.permissions.map( id => ({ id } as PermissionOrmEntity) );
        } else if (updateRolInput.permissions && updateRolInput.permissions.length === 0) {
            rol.permissions = [];
        }

        await this.repo.save(rol);
        return this.findOne(updateRolInput.id) as Promise<Rol>;
    }

    async validateIfRolExistsByName(name: string): Promise<boolean> {
        const rol = await this.repo.createQueryBuilder('rol')
            .where('rol.name = :name', { name })
            .andWhere('rol.deleted_at IS NULL')
            .getExists();
        return rol;
    }

    async delete(id: string): Promise<boolean> {
        const query = await this.repo.createQueryBuilder('rol')
            .update({
                deleted_at: () => 'CURRENT_TIMESTAMP'
            })
            .where('id = :id', { id })
            .execute();
        
        if(query.affected && query.affected > 0) return true;
        return false;
    }

    async dropAllRols(): Promise<void> {
        await this.repo.createQueryBuilder()
            .delete()
            .from(RolOrmEntity)
            .execute();
        return;
    }

    async findByName(name: string): Promise<Rol | null> {
        const rol = await this.repo.createQueryBuilder('rol')
            .where('rol.name = :name', { name })
            .andWhere('rol.deleted_at IS NULL')
            .getOne();
        
        if(!rol) return null;
        return Rol.createFromObj(rol);
    }
}