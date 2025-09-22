import { Injectable, Inject, NotImplementedException, NotFoundException } from '@nestjs/common';
import { IPermissionRepository } from 'src/permissions/domain/interface/ipermission.repository';

@Injectable()
export class GetOnePermissionUseCase {
    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository       
    ) {};

    async execute(id: string) {
        const permission = await this.permissionRepository.findOne(id);
        if(!permission) throw new NotFoundException(`Permission with id ${id} not found.`);
        return permission?.getGraphQLType() ?? null;
    }
}