import { NextResponse } from 'next/server'
import { getUser } from '@/lib/userStore'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: '邮箱和密码不能为空' }, { status: 400 })
    }

    const user = await getUser(email)

    if (!user) {
      return NextResponse.json({ error: '该邮箱未注册，请先注册' }, { status: 400 })
    }

    if (user.password !== password) {
      return NextResponse.json({ error: '密码错误' }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: '登录成功' })
  } catch (error: any) {
    console.error('登录失败:', error)
    return NextResponse.json({ error: '登录失败: ' + error.message }, { status: 500 })
  }
}
