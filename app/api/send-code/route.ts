import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { setCode } from '@/lib/codeStore';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(email, code);

    await transporter.sendMail({
      from: `"Dating App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '验证码',
      html: `
        <div style="max-width:400px;margin:0 auto;padding:20px;font-family:sans-serif;">
          <h2 style="color:#e91e63;">你的验证码</h2>
          <p>验证码为：</p>
          <h1 style="color:#333;letter-spacing:8px;font-size:32px;">${code}</h1>
          <p style="color:#999;">5分钟内有效，请勿泄露给他人。</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: '验证码已发送' });
  } catch (error: any) {
    console.error('发送验证码失败:', error);
    return NextResponse.json({ error: '发送失败: ' + error.message }, { status: 500 });
  }
}
