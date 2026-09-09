'use client';
import { useRouter } from 'next/navigation';

export default function MomentsPage() {
  const router = useRouter();

  const moments = [
    { user: 'Sarah', avatar: 'S', content: '今天去看了富士山，风景真的太治愈了！', time: '2小时前', likes: 128, comments: [{name: 'Kenji', text: '好美！'}] },
    { user: 'Emma', avatar: 'E', content: '伦敦的雨天总是这么有诗意。', time: '昨天', likes: 214, comments: [] },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#1e293b', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800' }}>动态广场</h1>
      </div>

      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {moments.map((m, i) => (
          <div key={i} style={{ background: '#ffffff', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', marginRight: '12px', display:'flex', alignItems:'center', justifyContent:'center', color:'#64748b', fontWeight:'bold' }}>{m.avatar}</div>
              <span style={{ fontWeight: '700', fontSize: '17px', color: '#1e293b' }}>{m.user}</span>
            </div>
            <p style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#334155', lineHeight: '1.6' }}>{m.content}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>{m.time}</span>
              <div style={{ display: 'flex', gap: '20px', color: '#64748b', fontSize: '14px' }}>
                <span>赞 {m.likes}</span>
                <span>评论 {m.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
