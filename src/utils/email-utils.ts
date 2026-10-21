import nodemailer from 'nodemailer';

class EmailUtils {
    private static async sendEmail(
        listTo: string[],
        subject: string,
        text: string,
        html = ''
    ) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `${process.env.MAIL_APP} <${process.env.MAIL_USERNAME}>`,
            to: listTo.join(', '),
            subject: subject,
            text: text,
            html: html
        });
    }

    public static async sendActivationEmail(
        listTo: string | string[],
        token: string
    ) {
        EmailUtils.sendEmail(
            Array.isArray(listTo) ? listTo : [listTo],
            `[${process.env.MAIL_APP}] Member account activation`,
            `This email was sent in order to activate your member account, 
            please use the following link to activate your account http://localhost:5173/activate?token=${token}`
        )
    }

    public static async sendForgotPasswordEmail(
        listTo: string | string[],
        token: string
    ) {
        EmailUtils.sendEmail(
            Array.isArray(listTo) ? listTo : [listTo],
            `[${process.env.MAIL_APP}] Member account password reset`,
            `This email was sent in order to reset your password, 
            please use the following link to reset your password http://localhost:5173/reset-password?token=${token}`
        )
    }

    public static async sendReminderEmail(
        listTo: string | string[],
        title: string,
        startDate: Date,
        host: string
    ) {
        EmailUtils.sendEmail(
            Array.isArray(listTo) ? listTo : [listTo],
            `[${process.env.MAIL_APP}] Event reminder`,
            `This email was sent in order to remind you about the event ${title} that will start at ${startDate} and will be hosted by ${host}`
        )
    }

    public static async sendChangeEmailEmail(listTo: string | string[], token: string) {
        EmailUtils.sendEmail(
            Array.isArray(listTo) ? listTo : [listTo],
            `[${process.env.MAIL_APP}] Account email change`,
            `This email was sent in order to change your email, 
            please use the following link to change your email http://localhost:5173/app/confirm-change-email?token=${token}`
        )
    }

    public static async sendChangePasswordEmail(listTo: string | string[], token: string) {
        EmailUtils.sendEmail(
            Array.isArray(listTo) ? listTo : [listTo],
            `[${process.env.MAIL_APP}] Account password change`,
            `This email was sent in order to change your password, 
            please use the following link to change your password http://localhost:5173/app/confirm-change-password?token=${token}`
        )
    }

    public static async sendMentionEmail(
        listTo: string | string[],
        eventId: string
    ) {
        EmailUtils.sendEmail(
            Array.isArray(listTo) ? listTo : [listTo],
            `[${process.env.MAIL_APP}] Event mention`,
            `This email was sent in order to inform you that you were mentioned in an event http://localhost:5173/events/${eventId}, please check your events page for more details.`
        )
    }
}

export default EmailUtils;