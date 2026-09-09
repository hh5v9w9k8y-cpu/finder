'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [account, setAccount] = useState('');
  const [codeOrPwd, setCodeOrPwd] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const handleSubmit = () => {
    if (!agreed) { alert('请先同意用户协议与隐私政策'); return; }
    if (!account || !codeOrPwd) { alert('请输入完整信息'); return; }
    // 模拟登录/注册成功，存入记忆登录凭证
    localStorage.setItem('remember_token', 'mock_jwt_token_' + Date.now());
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'PingFang SC', sans-serif" }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', marginBottom: '40px' }}>Tandem Social</h1>
      
      <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', marginBottom: '20px', background: '#f1f5f9', borderRadius: '12px', padding: '4px' }}>
          <button onClick={() => setMode('login')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', background: mode === 'login' ? '#fff' : 'transparent', color: mode === 'login' ? '#1e293b' : '#94a3b8' }}>登录</button>
          <button onClick={() => setMode('register')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', background: mode === 'register' ? '#fff' : 'transparent', color: mode === 'register' ? '#1e293b' : '#94a3b8' }}>注册</button>
        </div>

        <div style={{ display: 'flex', marginBottom: '15px', gap: '10px' }}>
          <button onClick={() => setMethod('phone')} style={{ flex: 1, padding: '8px', border: '1px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', background: method === 'phone' ? '#1e293b' : '#fff', color: method === 'phone' ? '#fff' : '#64748b' }}>手机号</button>
          <button onClick={() => setMethod('email')} style={{ flex: 1, padding: '8px', border: '1px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', background: method === 'email' ? '#1e293b' : '#fff', color: method === 'email' ? '#fff' : '#64748b' }}>邮箱</button>
        </div>

        <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder={method === 'phone' ? '请输入手机号' : '请输入邮箱'} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '12px', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} />
        <input value={codeOrPwd} onChange={(e) => setCodeOrPwd(e.target.value)} type="password" placeholder={mode === 'login' ? '密码 / 验证码' : '设置密码'} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', fontSize: '13px', color: '#64748b' }}>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginRight: '8px' }} />
          <span>我已阅读并同意 <span onClick={() => setShowAgreement(true)} style={{ color: '#1e293b', fontWeight: '600', cursor: 'pointer' }}>《用户协议》</span> 与 <span onClick={() => setShowAgreement(true)} style={{ color: '#1e293b', fontWeight: '600', cursor: 'pointer' }}>《隐私政策》</span></span>
        </div>

        <button onClick={handleSubmit} style={{ width: '100%', padding: '16px', background: '#1e293b', border: 'none', borderRadius: '14px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
          {mode === 'login' ? '登录' : '注册'}
        </button>
      </div>

      {showAgreement && (
        <div onClick={() => setShowAgreement(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', padding: '30px', borderRadius: '24px', maxWidth: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 15px', color: '#1e293b' }}>用户协议与隐私政策</h2>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.8' }}>我们承诺严格保护您的个人信息安全。收集的数据仅用于同龄人匹配与社交功能优化，绝不向第三方泄露。您有权随时查阅、修改或删除个人数据，也可随时注销账号。</p>
            <button onClick={() => setShowAgreement(false)} style={{ marginTop: '20px', width: '100%', padding: '12px', background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>我知道了</button>
          </div>
        </div>
      )}
    </div>
  );
}
