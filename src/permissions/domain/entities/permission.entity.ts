import { PermissionGraphQL } from "src/permissions/interface/graphql/permission.graphql-type";

export class Permission {
	constructor(
		private readonly id: string,
		private readonly name: string,
		private readonly description: string | null,
		private readonly is_active: boolean,
		private readonly created_at: Date,
		private readonly updated_at: Date,
		private readonly deleted_at?: Date | null,
		private roles?: any[] | null,
	) {};

	static createFromObj(data: any) : Permission {
		const permission = new Permission(
			data.id,
			data.name,
			data.description,
			data.is_active,
			data.created_at,
			data.updated_at,
			data.deleted_at,

		);
		return permission;
	}

	setRoles(roles: any[]) {
		this.roles = roles;
	}

	getGraphQLType() : PermissionGraphQL {
		return new PermissionGraphQL(
			{
				id: this.id,
				name: this.name,
				description: this.description,
				is_active: this.is_active,
				created_at: this.created_at,
				updated_at: this.updated_at,
				deleted_at: this.deleted_at,
				roles: this.roles ?? [],
			}
		);
	}
}
