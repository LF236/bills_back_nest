import { Injectable, Logger } from '@nestjs/common';
import { EmailEntity } from '../domain/entities/email.entity';
import { EmailServicePort } from '../domain/ports/email-service.port';
import * as nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { join } from 'path';
import * as React from 'react';

@Injectable()
export class NodemailerEmailService implements EmailServicePort {
    private transporter : nodemailer.Transporter;
    private readonly logger = new Logger(NodemailerEmailService.name, { timestamp: true });

    constructor(
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        })
    }

    async sendEmail(email: EmailEntity): Promise<boolean> {
        try {
            let html = email.body;
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email.to,
                subject: email.subject,
                html: html,
            });
            return true;
        } catch(error) {
            this.logger.error(`Error sending email to ${email.to}: ${error}`);
            return false;
        }
    }

    async sendValidateAccountEmail(email: EmailEntity, link: string) : Promise<boolean> {
        try {
            let html = '';
            if(email.template) {
                const Template = (await import(join(__dirname, 'templates', `${email.template}`))).default;
                const element = React.createElement(Template, { email: email.to, link: link });
                html = await render(element);
            }

            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email.to,
                subject: email.subject,
                html: html,
            });
            return true;
        } catch(error) {
            this.logger.error(`Error sending email to ${email.to}: ${error}`);
            return false;
        }
    }
}