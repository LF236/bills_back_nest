import { EmailEntity } from "../entities/email.entity";

export interface EmailServicePort {
    sendEmail(email: EmailEntity) : Promise<boolean>;
}