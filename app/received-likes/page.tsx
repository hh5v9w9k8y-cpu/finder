'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ReceivedLikesPage() {
  const [likes, setLikes] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) { alert('请先登录！'); router.push('/login'); }
    else {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      const fetchLikes = async () => {
        const supabase = createClient();
        const { data } = await supabase.from('likes').select('*').eq('to_user', user.name);
        if (data) setLikes(data);
      };
      fetchLikes();
    }
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#fff', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      {/* 【新增】顶部导航栏 + 返回按钮 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <button onClick={() => router.back()} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}>⬅️</button>
        <h1 style={{ margin: 0, fontSize: '24px' }}>💌 谁喜欢我</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {likes.length === 0 ? <p style={{color: '#aaa'}}>暂时还没有人喜欢你哦，继续加油！</p> : 
          likes.map((like) => (
            <div key={like.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              ❤️ <strong>{like.from_user}</strong> 对你心动了！
            </div>
          ))
        }
      </div>
    </div>
  );
}