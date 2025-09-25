import { Rol } from "src/rols/domain/entities/rol.entity";
import { RolsGraphql } from "src/rols/interfaces/graphql/rols.graphql-type";
import { UserGraphQL } from "src/user/interface/graphql/user.graphql-type";

export class User {
	constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly password: string,
		public readonly is_active: boolean,
		public roles?: Rol[]
	) {};


	static createFromObj(data : any) : User {
		return new User(
			data.id,
			data.email,
			data.password,
			data.is_active
		);
	}

	setRoles(roles: any[]) {
		this.roles = roles;
	}

	getEmail() : string {
		return this.email;
	}

	getGraphQLType() : UserGraphQL {
		return new UserGraphQL(
			this.id,
			this.email,
			this.is_active,
			this.roles ? this.roles.map( role => RolsGraphql.createFromObj(role) ) : []
		);	
	}
}
