export const SEED_PERMISSIONS = [
	{
		name: 'view_dashboard',
		is_active: true,
		description: 'Permission to view the dashboard',
	},
	{
		name: 'manage_users',
		is_active: true,
		description: 'Permission to manage users',
	},
	{
		name: 'manage_roles',
		is_active: true,
		description: 'Permission to manage roles',
	},
	{
		name: 'manage_permissions',
		is_active: true,
		description: 'Permission to manage permissions',
	},
	{
		name: 'view_users',
		is_active: true,
		description: 'Permission to view users',
	},
	{
		name: 'create_update_users',
		is_active: true,
		description: 'Permission to create and update users',
	},
	{
		name: 'delete_users',
		is_active: true,
		description: 'Permission to delete users',
	},
	{
		name: 'view_roles',
		is_active: true,
		description: 'Permission to view roles',
	},
	{
		name: 'create_update_roles',
		is_active: true,
		description: 'Permission to create and update roles',
	},
	{
		name: 'delete_roles',
		is_active: true,
		description: 'Permission to delete roles',
	},
	{
		name: 'view_permissions',
		is_active: true,
		description: 'Permission to view permissions',
	},
	{
		name: 'create_update_permissions',
		is_active: true,
		description: 'Permission to create and update permissions',
	},
	{
		name: 'delete_permissions',
		is_active: true,
		description: 'Permission to delete permissions',
	}
];

export const SEED_ROLES = [
	{
		name: 'super_admin',
		is_active: true,
		description: 'Super Admin role with all permissions',
	},
	{
		name: 'default_user',
		is_active: true,
		description: 'Default user role with basic permissions',
	}
];


export const SEED_USERS = [
	{
		email: 'superadmin@local.com',
		password: 'superadmin',
		is_active: true
	}
];
