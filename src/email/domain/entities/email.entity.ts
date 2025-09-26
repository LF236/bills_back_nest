export class EmailEntity {
    constructor(
        public readonly to: string,
        public readonly subject: string,
        public readonly body: string,
        public readonly template?: string,
        
    ) {
        if(!to) throw new Error('Recipient email address is required');
        if(!subject) throw new Error('Email subject is required');
        if(!body) throw new Error('Email body is required');
    };
}