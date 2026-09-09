'use client';
import { useRouter } from 'next/navigation';

export default function GamesPage() {
  const router = useRouter();
  const games = [
    { name: '谁是卧底', desc: '考验默契与演技', players: '128人在玩', color: '#c084fc' },
    { name: '你画我猜', desc: '灵魂画手集合', players: '96人在玩', color: '#60a5fa' },
    { name: '真心话大冒险', desc: '勇敢者的游戏', players: '256人在玩', color: '#f87171' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#1e293b', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800' }}>互动游戏</h1>
      </div>

      <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {games.map((g, i) => (
          <div key={i} onClick={() => alert(`正在进入【${g.name}】房间...`)} style={{ background: '#ffffff', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', cursor: 'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', transition: 'transform 0.2s', borderLeft: `4px solid ${g.color}` }}>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#1e293b', fontWeight:'700' }}>{g.name}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>{g.desc}</p>
            </div>
            <span style={{ fontSize: '12px', color: g.color, background: `${g.color}20`, padding: '4px 10px', borderRadius: '12px', fontWeight:'bold' }}>{g.players}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
