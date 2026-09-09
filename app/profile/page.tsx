'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState('Finder用户');

  useEffect(() => {
    const savedEmail = localStorage.getItem('user_email');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_email');
    router.push('/login'); // 退出后强制回到登录页
  };

  return (
    <div style={{ minHeight: '100vh', background: '#121212', fontFamily: "'PingFang SC', sans-serif" }}>
      <div style={{ background: '#1e1e1e', padding: '30px 20px', display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#fff' }}>
          {email[0].toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '800', color: '#fff' }}>{email}</h2>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#aaa' }}>
            <span><strong style={{color:'#fff'}}>128</strong> 粉丝</span>
            <span><strong style={{color:'#fff'}}>56</strong> 关注</span>
          </div>
        </div>
        <button onClick={() => router.push('/profile/edit')} style={{ position: 'absolute', top: '30px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* 退出登录按钮 */}
      <div style={{ padding: '30px 20px' }}>
        <button onClick={handleLogout} style={{ 
          width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #ef4444', 
          background: 'transparent', color: '#ef4444', fontSize: '16px', fontWeight: '700', cursor: 'pointer'
        }}>
          退出登录 / 注销
        </button>
      </div>
    </div>
  );
}
