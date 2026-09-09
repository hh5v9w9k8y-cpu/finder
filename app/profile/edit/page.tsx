'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 模拟图标组件
const Icon = ({ type }: { type: string }) => {
  const baseClass = "w-6 h-6 rounded-xl flex items-center justify-center text-white";
  switch (type) {
    case 'music': return <div className={`${baseClass} bg-blue-600`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>;
    case 'plane': return <div className={`${baseClass} bg-blue-500`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></div>;
    case 'mbti': return <div className={`${baseClass} bg-purple-600`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg></div>;
    case 'blood': return <div className={`${baseClass} bg-purple-500`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg></div>;
    case 'home': return <div className={`${baseClass} bg-teal-600`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>;
    case 'job': return <div className={`${baseClass} bg-teal-500`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>;
    case 'school': return <div className={`${baseClass} bg-teal-400`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>;
    default: return <div className={`${baseClass} bg-gray-600`}></div>;
  }
};

export default function EditProfilePage() {
  const router = useRouter();
  
  // 初始化状态，模拟从本地存储读取或默认值
  const [data, setData] = useState({
    interests: '健身, 高尔夫, 滑旱冰',
    travelGoal: 'ny',
    mbti: 'INTP',
    bloodType: 'A',
    hometown: 'China',
    job: '本科生',
    school: 'MIT',
    location: '深圳市,中国',
    region: 'China',
    gender: '男',
    birthday: '2008/08/17',
    constellation: '狮子座'
  });

  // 简单的跳转编辑逻辑（实际开发中会跳转到子页面）
  const handleEditClick = (field: string) => {
    alert(`这里将打开【${field}】的选择器或输入框`);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#121212', 
      color: '#fff', 
      fontFamily: "'PingFang SC', sans-serif",
      paddingBottom: '100px' // 为底部按钮留空间
    }}>
      {/* 顶部导航 */}
      <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <button onClick={() => router.back()} style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>编辑资料</h1>
      </div>

      {/* 内容区域 */}
      <div style={{ padding: '0 15px' }}>
        
        {/* 兴趣板块 */}
        <Section title="兴趣">
          <Item icon="music" label="添加兴趣爱好" value={data.interests} onClick={() => handleEditClick('兴趣爱好')} />
          <Item icon="plane" label="我想去的地方" value={data.travelGoal} onClick={() => handleEditClick('想去的地方')} />
        </Section>

        {/* 个人信息板块 */}
        <Section title="个人信息">
          <Item icon="mbti" label="我的 MBTI" value={data.mbti} onClick={() => handleEditClick('MBTI')} />
          <Item icon="blood" label="我的血型" value={data.bloodType} onClick={() => handleEditClick('血型')} />
          <Item icon="home" label="我的家乡" value={data.hometown} onClick={() => handleEditClick('家乡')} />
          <Item icon="job" label="我的职业" value={data.job} onClick={() => handleEditClick('职业')} />
          <Item icon="school" label="我的学校" value={data.school} onClick={() => handleEditClick('学校')} />
        </Section>

        {/* 其他板块 */}
        <Section title="其他">
          {/* ID 特殊样式 */}
          <div style={{ background: '#1e1e1e', borderRadius: '12px', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Finder ID</div>
              <div style={{ fontSize: '16px', color: '#fff' }}>@finder_user_01</div>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: '14px', cursor: 'pointer' }}>编辑</button>
          </div>

          <SimpleItem label="位置" value={data.location} isLocation />
          <SimpleItem label="地区" value={data.region} />
          <SimpleItem label="性别" value={data.gender} />
          <SimpleItem label="生日" value={data.birthday} />
          <SimpleItem label="我的星座" value={data.constellation} />
        </Section>

      </div>

      {/* 底部固定按钮 */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, 
        background: '#121212', padding: '15px 20px 30px', 
        display: 'flex', gap: '15px', borderTop: '1px solid #222'
      }}>
        <button style={{ flex: 1, padding: '14px', borderRadius: '25px', border: 'none', background: '#8b5cf6', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
          预览
        </button>
        <button style={{ flex: 1, padding: '14px', borderRadius: '25px', border: 'none', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
          开通 VIP
        </button>
      </div>
    </div>
  );
}

// 子组件：板块标题
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ marginBottom: '25px' }}>
    <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', paddingLeft: '5px' }}>{title}</h2>
    {children}
  </div>
);

// 子组件：带图标的列表项
const Item = ({ icon, label, value, onClick }: { icon: string, label: string, value: string, onClick: () => void }) => (
  <div onClick={onClick} style={{ 
    background: '#1e1e1e', borderRadius: '12px', padding: '12px 15px', 
    display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' 
  }}>
    <div style={{ marginRight: '15px' }}><Icon type={icon} /></div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '16px', color: '#fff' }}>{value || '未填写'}</div>
    </div>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
  </div>
);

// 子组件：简单列表项（无图标）
const SimpleItem = ({ label, value, isLocation }: { label: string, value: string, isLocation?: boolean }) => (
  <div style={{ 
    background: '#1e1e1e', borderRadius: '12px', padding: '15px', 
    marginBottom: '10px', position: 'relative'
  }}>
    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontSize: '16px', color: '#fff' }}>{value}</div>
    {isLocation && (
      <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#8b5cf6' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
      </div>
    )}
  </div>
);
