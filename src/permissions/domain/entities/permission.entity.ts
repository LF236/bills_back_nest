import { PermissionGraphQL } from "src/permissions/interface/graphql/permission.graphql-type";

export class Permission {
	constructor(
		private readonly id: string,
		private readonly name: string,
		private readonly description: string | null,
		private readonly is_active: boolean,
		private readonly created_at: Date,
		private readonly updated_at: Date,
		private readonly roles?: any[] | null,
	) {};

	static createFromObj(data: any) : Permission {
		const permission = new Permission(
			data.id,
			data.name,
			data.description,
			data.is_active,
			data.created_at,
			data.updated_at,

		);
		return permission;
	}

	getGraphQLType() : PermissionGraphQL {
		return new PermissionGraphQL(
			this.id,
			this.name,
			this.description ?? '',
			this.is_active,
			this.created_at,
			this.updated_at,
			null, // deleted_at is not set in this context
			this.roles ? this.roles.map(role => role.id) : []
		);
	}
}
