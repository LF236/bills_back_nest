export class MaginLinkEntity {
    constructor(
        private readonly id: string,
        private readonly token: string,
        private readonly user_id: string,
        private readonly expires_at: Date,
        private readonly created_at: Date,
        private readonly used_at: Date | null = null,
    ) {};

    static createFromObj(data: any) : MaginLinkEntity {
        const magicLink = new MaginLinkEntity(
            data.id,
            data.token,
            data.user_id,
            data.expires_at,
            data.created_at,
            data.used_at ?? null,
        );
        return magicLink;
    }

    getToken() : string {
        return this.token;
    }

    tokenIsExpired() : boolean {
        return this.expires_at < new Date();
    }

    isUsed() : boolean {
        return this.used_at !== null;
    }
}