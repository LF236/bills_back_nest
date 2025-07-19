
export class PasswordNotMatchError extends Error {
	constructor() {
		super('Passwords do not match');
		this.name = 'PasswordNotMatchError';
	}
}
