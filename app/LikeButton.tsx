'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LikeButton({ toUser }: { toUser: string }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // 页面加载时，去浏览器的“小本本”里找找有没有登录信息
  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  const handleLike = async () => {
    if (loading || liked) return;
    
    // 如果没登录，提醒一下
    if (!currentUser) {
      return alert('请先点击右上角的【登录】按钮哦！');
    }

    setLoading(true);
    const supabase = createClient();
    
    // 1. 先记录咱们的心动
    const { error } = await supabase.rpc('add_like', {
      from_user: currentUser.name,
      to_user: toUser
    });

    if (!error) {
      setLiked(true);
      
      // 2. 检查对方是不是也心动了咱们
      const { data: mutualLike } = await supabase
        .from('likes')
        .select('*')
        .eq('from_user', toUser)
        .eq('to_user', currentUser.name)
        .single();
      
      // 3. 如果对方也心动了，弹出浪漫提示！
      if (mutualLike) {
        alert(`🎉 恭喜！你和 ${toUser} 互相心动了！快去认识一下吧！`);
      }
    } else {
      alert('心动失败，请重试');
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleLike}
      disabled={liked || loading}
      style={{
        padding: '8px 20px',
        backgroundColor: liked ? '#ccc' : '#ff4757',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: liked || loading ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        transition: 'all 0.2s'
      }}
    >
      {loading ? '⏳ 发送中...' : liked ? '💖 已心动' : '🤍 心动'}
    </button>
  );
}
