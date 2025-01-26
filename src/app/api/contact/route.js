import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST (req) {
    try {
        const formData = await req.json();
        const { name, email, message } = formData;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'williamfaraday123@gmail.com',
                pass: 'uk6vrunh'
            }
        });

        const mailOptions = {
            from: email,
            to: 'williamfaraday123@gmail.com',
            subject: 'mytravelblog: New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
        };

        try {
            await transporter.sendMail(mailOptions);
            return NextResponse.json({ message: 'Successfully sent email' }, { status: 200 });
        } catch (error) {
            console.error('Error sending email:', error.message, error.stack);
            throw error;
        }
    } catch (error) {
        console.error('Error sending email:', error.message, error.stack);
        return NextResponse.json({ error: 'Error sending mail' }, { status: 500 });
    }
}