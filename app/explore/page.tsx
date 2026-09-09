'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { findMatches, UserProfile } from '../../lib/matchAlgorithm';

export default function ExplorePage() {
  const router = useRouter();
  const [matchedUsers, setMatchedUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const me: UserProfile = { id: '1', age: 22, tags: ['旅行', '美食'], language: 'Chinese' };
    const pool: UserProfile[] = [
      { id: '2', age: 21, tags: ['旅行', '音乐'], language: 'English' },
      { id: '3', age: 23, tags: ['美食', '电影'], language: 'Japanese' },
      { id: '5', age: 22, tags: ['旅行', '美食', '摄影'], language: 'English' },
    ];
    setMatchedUsers(findMatches(me, pool));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#1e293b', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: '0 0 0 0', fontSize: '26px', fontWeight: '800' }}>同龄人广场</h1>
      </div>

      <div style={{ flex: 1, padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {matchedUsers.map((user, i) => (
          <div key={user.id} style={{ background: '#fff', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e2e8f0', backgroundImage: `url(https://i.pravatar.cc/100?img=${10 + i})`, backgroundSize: 'cover' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '17px' }}>User {user.id} ({user.age}岁)</span>
                <span style={{ fontSize: '12px', color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: '10px' }}>{user.language}</span>
              </div>
              <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#64748b' }}>共同标签: {user.tags.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
