'use client';
import Link from 'next/link';

export default function MessagesPage() {
  const chats = [
    { id: 1, name: 'Sarah', msg: '很高兴认识你！', time: '10:30', unread: 2 },
    { id: 2, name: 'Kenji', msg: '明天一起练习口语吗？', time: '昨天', unread: 0 },
    { id: 3, name: 'Emma', msg: '这个发音怎么读？', time: '周三', unread: 1 },
    { id: 4, name: 'Carlos', msg: '太棒了！', time: '周一', unread: 0 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800' }}>消息</h1>
      </div>

      <div style={{ flex: 1, padding: '0 20px' }}>
        {chats.map((c) => (
          <Link key={c.id} href={`/messages/${c.id}`} style={{ display: 'flex', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #e2e8f0', cursor: 'pointer', textDecoration: 'none' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#64748b', marginRight: '15px' }}>{c.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: '700', fontSize: '17px', color: '#1e293b' }}>{c.name}</span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{c.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', color: '#64748b' }}>{c.msg}</span>
                {c.unread > 0 && <span style={{ background: '#ef4444', color: '#fff', fontSize: '11px', padding: '2px 7px', borderRadius: '10px', fontWeight: 'bold' }}>{c.unread}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
