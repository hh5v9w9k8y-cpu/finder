import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reportedUserId, reason } = body;

    // 1. 从请求头中获取 Authorization Token (前端发送过来的)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未登录，缺少 Token' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // 2. 使用 service_role key 创建管理员客户端，并传入用户的 token
    // 这样既能绕过 RLS 权限，又能识别出当前是哪个用户在操作
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    // 3. 获取当前登录用户 (举报人)
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: '未登录或 Token 已过期' }, { status: 401 });
    }

    // 4. 插入举报记录
    const { error: insertError } = await supabaseAdmin
      .from('reports')
      .insert({
        reporter_id: user.id,
        reported_user_id: reportedUserId,
        reason: reason,
      });

    if (insertError) throw insertError;

    // 5. 统计该用户被举报次数
    const { count, error: countError } = await supabaseAdmin
      .from('reports')
      .select('*', { count: 'exact', head: true })
      .eq('reported_user_id', reportedUserId);

    if (countError) throw countError;

    // 6. 如果举报次数 >= 3，执行封号逻辑
    if (count && count >= 3) {
      console.log(`用户 ${reportedUserId} 被举报 ${count} 次，触发封号`);
      
      const { error: updateError } = await supabaseAdmin
        .from('profiles') 
        .update({ is_banned: true })
        .eq('id', reportedUserId);

      if (updateError) console.error('封号更新失败:', updateError);
    }

    return NextResponse.json({ success: true, reportCount: count });

  } catch (error: any) {
    console.error('举报处理失败:', error);
    return NextResponse.json({ error: error.message || '举报失败' }, { status: 500 });
  }
}
