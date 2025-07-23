export class Permission {
	constructor(
		private readonly id: string,
		private readonly name: string,
		private readonly description: string | null,
		private readonly is_active: boolean,
		private readonly created_at: Date,
		private readonly updated_at: Date,
		private readonly roles: any[] | null = null,
	) {};

	static createFromObj(data: any) : Permission {
		return new Permission(
			data.id,
			data.name,
			data.description,
			data.is_active,
			data.created_at,
			data.updated_at,
			data.roles || null
		);
	}
}
