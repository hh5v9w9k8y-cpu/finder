'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !age || !bio) return alert('请填写完整信息哦！');
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from('profiles').insert({
      name,
      age: Number(age),
      bio,
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'
    });

    if (error) {
      alert('注册失败: ' + error.message);
    } else {
      alert('注册成功！');
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1>📝 注册新同学</h1>
      <p>加入我们的交友圈吧！</p>
      
      <input placeholder="你的名字" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box' }} />
      <input placeholder="你的年龄" type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box' }} />
      <textarea placeholder="一句话介绍自己" value={bio} onChange={(e) => setBio(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box' }} />
      
      <button onClick={handleRegister} disabled={loading} style={{ width: '100%', padding: '12px', marginTop: '20px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '16px' }}>
        {loading ? '注册中...' : '🚀 立即注册'}
      </button>
      <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#666', textDecoration: 'none' }}>⬅️ 算了，返回首页</a>
    </div>
  );
}
