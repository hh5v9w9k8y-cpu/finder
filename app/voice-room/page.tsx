'use client';
import { useRouter } from 'next/navigation';

export default function VoiceRoomPage() {
  const router = useRouter();
  const users = [
    { name: 'Sarah', avatar: 'S', isMuted: false, isHost: true },
    { name: 'Kenji', avatar: 'K', isMuted: true, isHost: false },
    { name: 'Emma', avatar: 'E', isMuted: false, isHost: false },
    { name: 'Carlos', avatar: 'C', isMuted: true, isHost: false },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#161b22', color: '#fff', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>深夜聊天室</h1>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignContent: 'start' }}>
        {users.map((u, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '70px', height: '70px', borderRadius: '50%', 
              background: '#21262d', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#8b949e', 
              border: u.isHost ? '2px solid #d2a8ff' : '2px solid transparent', 
              boxShadow: u.isHost ? '0 0 15px rgba(210,168,255,0.3)' : 'none'
            }}>
              {u.avatar}
            </div>
            <span style={{ fontSize: '14px', color: '#c9d1d9', fontWeight: '500' }}>{u.name}</span>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: u.isMuted ? '#21262d' : '#3fb950', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!u.isMuted && <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }} />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', background: 'rgba(22,27,34,0.9)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-around', backdropFilter: 'blur(15px)' }}>
        <button style={{ background: '#21262d', border: 'none', color: '#c9d1d9', padding: '12px 30px', borderRadius: '24px', fontSize: '15px', fontWeight: '600' }}>举手</button>
        <button style={{ background: '#da3633', border: 'none', color: '#fff', padding: '12px 30px', borderRadius: '24px', fontSize: '15px', fontWeight: '600' }}>离开</button>
      </div>
    </div>
  );
}
