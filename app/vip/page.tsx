'use client';
import { useRouter } from 'next/navigation';

export default function VipPage() {
  const router = useRouter();
  const benefits = ['专属尊贵头像框', '无限次语音房上麦', '消息已读回执', '全球语伴优先匹配'];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#1e293b', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800' }}>尊享VIP</h1>
      </div>

      <div style={{ padding: '0 20px', flex: 1 }}>
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '24px', padding: '30px', marginBottom: '20px', textAlign:'center' }}>
          <h2 style={{margin:'0 0 10px', fontSize:'28px', color:'#b45309'}}>解锁头等舱体验</h2>
          <p style={{margin:0, fontSize:'15px', color:'#d97706'}}>让每一次交流都与众不同</p>
        </div>

        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'15px 0', borderBottom: i < benefits.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:'#fef3c7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{ fontSize:'16px', color:'#334155' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <button style={{ width:'100%', padding:'18px', background:'#1e293b', border:'none', borderRadius:'24px', color:'#fff', fontSize:'17px', fontWeight:'bold', cursor:'pointer' }}>
          立即开通 (¥30/月)
        </button>
      </div>
    </div>
  );
}
