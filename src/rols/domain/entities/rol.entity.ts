export class Rol {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly description: string | null,
        private readonly is_active: boolean,
        private readonly created_at: Date,
        private readonly updated_at: Date,
        private readonly deleted_at: Date | null = null,
        private readonly users?: any[] | null,
        private readonly permissions?: any[] | null
    ) {};



    static createFromObj(data: any) : Rol {
        const rol = new Rol(
            data.id,
            data.name,
            data.description,
            data.is_active,
            data.created_at,
            data.updated_at,
            data.deleted_at ?? null,
        );
        return rol;
    }
}