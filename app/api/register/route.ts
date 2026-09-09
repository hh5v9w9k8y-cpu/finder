import { NextResponse } from 'next/server'
import { hasUser, addUser } from '@/lib/userStore'
import { getCode, deleteCode } from '@/lib/codeStore'

export async function POST(request: Request) {
  try {
    const { email, password, code } = await request.json()

    if (!email || !password || !code) {
      return NextResponse.json({ error: '邮箱、密码和验证码不能为空' }, { status: 400 })
    }

    if (await hasUser(email)) {
      return NextResponse.json({ error: '该邮箱已被注册' }, { status: 400 })
    }

    const storedCode = await getCode(email)
    if (!storedCode) {
      return NextResponse.json({ error: '验证码已过期或不存在' }, { status: 400 })
    }

    if (storedCode !== code) {
      return NextResponse.json({ error: '验证码错误' }, { status: 400 })
    }

    await deleteCode(email)
    await addUser(email, password)

    return NextResponse.json({ success: true, message: '注册成功' })
  } catch (error: any) {
    console.error('注册失败:', error)
    return NextResponse.json({ error: '注册失败: ' + error.message }, { status: 500 })
  }
}
