'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LivePage() {
  const router = useRouter();
  const [isMatching, setIsMatching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [country, setCountry] = useState('全球');
  const [gender, setGender] = useState('不限');
  const [isBeauty, setIsBeauty] = useState(true);
  const [isFrontCam, setIsFrontCam] = useState(true);

  const handleMatch = () => { setIsMatching(true); setTimeout(() => { setIsMatching(false); setIsConnected(true); }, 2000); };
  const handleHangUp = () => setIsConnected(false);
  const handleNext = () => { setIsMatching(true); setIsConnected(false); setTimeout(() => setIsMatching(false), 2000); };

  const selectStyle = { background: '#222', border: '1px solid #444', color: '#fff', padding: '10px 15px', borderRadius: '8px', fontSize: '14px', outline: 'none' };
  const btnStyle = (bg: string) => ({ padding: '15px 30px', background: bg, border: 'none', borderRadius: '30px', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' });

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #222' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '20px' }}>视频连线</h1>
      </div>

      <div style={{ flex: 1, position: 'relative', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!isConnected ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {isMatching ? (
              <>
                <div style={{ width: '60px', height: '60px', border: '4px solid #ff4757', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
                <p style={{ fontSize: '18px', color: '#aaa' }}>正在为你匹配 {country} 的 {gender} 好友...</p>
              </>
            ) : (
              <>
                <div style={{ width: '80px', height: '80px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                </div>
                <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '30px' }}>设置条件，开启奇妙缘分</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e90ff, #a55eea)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'rgba(255,255,255,0.8)' }}>对方画面</div>
            <div style={{ position: 'absolute', bottom: '100px', right: '20px', width: '120px', height: '160px', background: '#333', borderRadius: '12px', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#aaa' }}>我的画面</div>
          </>
        )}
      </div>

      <div style={{ padding: '20px', background: '#111' }}>
        {!isConnected ? (
          <>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
              <select value={country} onChange={(e) => setCountry(e.target.value)} style={selectStyle}>
                <option>全球</option><option>中国</option><option>美国</option><option>日本</option><option>韩国</option>
              </select>
              <select value={gender} onChange={(e) => setGender(e.target.value)} style={selectStyle}>
                <option>不限</option><option>男</option><option>女</option>
              </select>
            </div>
            <button onClick={handleMatch} disabled={isMatching} style={{ ...btnStyle('#ff4757'), width: '100%', opacity: isMatching ? 0.7 : 1 }}>
              {isMatching ? '匹配中...' : '立即匹配'}
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <button onClick={() => setIsBeauty(!isBeauty)} style={{ ...btnStyle(isBeauty ? '#ffd700' : '#444'), color: isBeauty ? '#000' : '#fff', padding: '15px', borderRadius: '50%', width: '60px', height: '60px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"/></svg>
            </button>
            <button onClick={handleNext} style={btnStyle('#1e90ff')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              下一个
            </button>
            <button onClick={handleHangUp} style={{ ...btnStyle('#ff4757'), width: '70px', height: '70px', borderRadius: '50%', padding: 0, fontSize: '14px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 2.59 3.4z"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
            <button onClick={() => setIsFrontCam(!isFrontCam)} style={{ ...btnStyle('#444'), padding: '15px', borderRadius: '50%', width: '60px', height: '60px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
            </button>
            <button style={btnStyle('#2ed573')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              消息
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
