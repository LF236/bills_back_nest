import { Inject, Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import { Permission } from "src/permissions/domain/entities/permission.entity";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";

@Injectable({ scope: Scope.REQUEST })
export class PermissionsLoader {
    private readonly loader: DataLoader<string, Permission[]>;

    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: IPermissionRepository
    ) {
        this.loader = this.permissionRepository.batchPermissions();
    };


    getLoader() {
        return this.loader;
    }
}