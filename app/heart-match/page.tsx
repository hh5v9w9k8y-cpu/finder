'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeartMatchPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const users = [
    { id: 1, name: 'Sarah', age: 22, bio: '喜欢旅行和美食 🍔', tags: ['旅行', '美食'], avatar: 'https://i.pravatar.cc/300?img=5' },
    { id: 2, name: 'Kenji', age: 23, bio: '正在学习中文，请多指教！', tags: ['日语', '动漫'], avatar: 'https://i.pravatar.cc/300?img=11' },
    { id: 3, name: 'Emma', age: 21, bio: '伦敦的雨天总是这么有诗意。', tags: ['摄影', '音乐'], avatar: 'https://i.pravatar.cc/300?img=9' },
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setTimeout(() => { setSwipeDirection(null); setCurrentIndex((prev) => prev + 1); }, 300);
  };

  const currentUser = users[currentIndex];
  if (!currentUser) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'#64748b'}}>暂无更多推荐</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#1e293b', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>心动匹配</h1>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '360px', height: '480px', marginBottom: '30px' }}>
        <div style={{
          position: 'absolute', width: '100%', height: '100%', borderRadius: '24px', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          transform: swipeDirection === 'left' ? 'translateX(-150%) rotate(-30deg)' : swipeDirection === 'right' ? 'translateX(150%) rotate(30deg)' : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70%', backgroundImage: `url(${currentUser.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
          <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800' }}>{currentUser.name}, {currentUser.age}</h2>
            <p style={{ margin: '0 0 15px', fontSize: '16px', opacity: 0.9 }}>{currentUser.bio}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {currentUser.tags.map((tag, i) => (
                <span key={i} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', borderRadius: '12px', fontSize: '13px', color: '#fff', fontWeight:'600' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        <button onClick={() => handleSwipe('left')} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', border: '2px solid #ef4444', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(239,68,68,0.2)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <button onClick={() => handleSwipe('right')} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', border: '2px solid #4ade80', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(74,222,128,0.2)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>
  );
}
