import { AppDataSource } from "../data-source";
import { Rol } from "src/rols/entities/rol.entity";
import { SEED_ROLES_INITIALIZE } from "./seed-data/inicializeData";


async function seed() {
	await AppDataSource.initialize();

	const rolesRepository = AppDataSource.getRepository(Rol);
	
	for(const role of SEED_ROLES_INITIALIZE) {
		const newRole = rolesRepository.create(role);
		await rolesRepository.save(newRole);
	}	
};

seed()
	.then(() => {
		console.log('Roles seeded successfully');
		AppDataSource.destroy();
	})
	.catch((error) => {
		console.error('Error seeding roles:', error);
		AppDataSource.destroy();
	});
