'use server'

import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 模拟数据库校验
  if (email === 'test@finder.com' && password === '123456') {
    // 这里可以写入 Cookie 或 Session
    redirect('/')
  }
  
  return { error: '账号或密码错误' }
}

export async function register(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 模拟注册逻辑
  if (email && password.length >= 6) {
    // 存入数据库后直接登录
    redirect('/')
  }

  return { error: '注册失败，请检查输入' }
}
