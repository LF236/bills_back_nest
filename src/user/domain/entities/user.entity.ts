import { UserGraphQL } from "src/user/interface/graphql/user.graphql-type";

export class User {
	constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly password: string,
		public readonly is_active: boolean,
	) {};


	static createFromObj(data : any) : User {
		return new User(
			data.id,
			data.email,
			data.password,
			data.is_active
		);
	}

	getGraphQLType() : UserGraphQL {
		return new UserGraphQL(
			this.id,
			this.email,
			this.is_active,
			[]
		);	
	}
}
