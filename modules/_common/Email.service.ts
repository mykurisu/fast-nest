import { Injectable, OnModuleInit } from '@nestjs/common'
import nodemailer from 'nodemailer'
import Config from '../../config'

@Injectable()
export class EmailService implements OnModuleInit {
    private transporter: any

    onModuleInit() {
        this.nodemailerInit()
    }

    async sendEmail(mail: string, content: { text: string, html: string }, from: string, subject: string) {
        await this.transporter.sendMail({
            from, // 发件人地址
            to: mail, // 收件人地址
            subject, // 邮件标题
            text: content.text,
            html: content.html
        });
    }

    private nodemailerInit() {
        if (!Config.emailSettings) {
            return console.error('邮箱服务初始化失败')
        }
        this.transporter = nodemailer.createTransport(Config.emailSettings)
    }
}
