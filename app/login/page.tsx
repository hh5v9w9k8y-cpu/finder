'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguageStore, translations } from '@/lib/i18n';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const LANGUAGES = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'ar', name: 'العربية' },
];

export default function LoginPage() {
  const router = useRouter();
  const { lang, setLang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations] || translations['en'];

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAgreement, setShowAgreement] = useState<'user' | 'privacy' | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);

  const sendCode = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.networkError);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Send failed');
      } else {
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch {
      setError(t.networkError);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isRegister && !agreed) {
      setError(t.agreeFirst);
      return;
    }
    setLoading(true);
    try {
      if (isRegister) {
        if (password.length < 6) {
          setError(t.pwdShort);
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError(t.pwdMismatch);
          setLoading(false);
          return;
        }
        if (!code) {
          setError(t.codeRequired);
          setLoading(false);
          return;
        }
        const res = await fetch(`${API_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, code })
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setLoading(false);
          return;
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_account', email);
        setShowAgeModal(true);
      } else {
        const res = await fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Login failed');
          setLoading(false);
          return;
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user_account', email);
        router.push('/');
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
      }
    } catch {
      setError(t.networkError);
    }
    setLoading(false);
  };

  const confirmAge = () => {
    if (!ageChecked) return;
    localStorage.setItem('isOver18', 'true');
    setShowAgeModal(false);
    router.push('/');
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  };

  const inputStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #333',
    background: '#1e1e1e',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box' as const
  };

  return (
    <div style={{ minHeight: '100vh', background: '#121212', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', fontFamily: "'PingFang SC', sans-serif", padding: '20px' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #333', background: '#1e1e1e', color: '#fff', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
      </div>
      <div style={{ width: '100%', maxWidth: '400px', background: '#1e1e1e', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '28px', textAlign: 'center' }}>{isRegister ? t.createAccount : t.welcome}</h1>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px', fontSize: '14px' }}>{t.subtitle}</p>
        {error && (
          <div style={{ padding: '12px', marginBottom: '16px', background: '#3b1111', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t.email} required style={inputStyle} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={t.password} required style={inputStyle} />
          {isRegister && (
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder={t.confirmPassword} required style={inputStyle} />
          )}
          {isRegister && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder={t.enterCode} maxLength={6} style={{ ...inputStyle, flex: 1 }} />
              <button type="button" onClick={sendCode} disabled={countdown > 0 || loading} style={{ padding: '0 20px', borderRadius: '12px', border: 'none', background: countdown > 0 ? '#444' : '#8b5cf6', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: countdown > 0 ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', minWidth: '110px' }}>
                {countdown > 0 ? `${countdown}${t.waitSeconds}` : t.sendCode}
              </button>
            </div>
          )}
          {isRegister && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#888', lineHeight: '1.5' }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: '3px', accentColor: '#8b5cf6', cursor: 'pointer', flexShrink: 0 }} />
              <span>
                {t.agree} <span onClick={() => setShowAgreement('user')} style={{ color: '#8b5cf6', cursor: 'pointer' }}>{t.userAgreement}</span> {t.and} <span onClick={() => setShowAgreement('privacy')} style={{ color: '#8b5cf6', cursor: 'pointer' }}>{t.privacyPolicy}</span>
              </span>
            </div>
          )}
          <button type="submit" disabled={loading} style={{ padding: '16px', borderRadius: '12px', border: 'none', background: loading ? '#666' : '#8b5cf6', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}>
            {loading ? t.processing : (isRegister ? t.registerBtn : t.loginBtn)}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#888' }}>
          {isRegister ? t.hasAccount : t.noAccount} <span onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ color: '#8b5cf6', cursor: 'pointer', marginLeft: '5px' }}>{isRegister ? t.goLogin : t.goRegister}</span>
        </p>
      </div>
      {showAgreement && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', background: '#1e1e1e', borderRadius: '16px', padding: '30px', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setShowAgreement(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#888', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ margin: '0 0 20px', fontSize: '20px' }}>{showAgreement === 'user' ? t.userAgreement : t.privacyPolicy}</h2>
            {showAgreement === 'user' ? (
              <div style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.8' }}>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>1. 服务说明</h3>
                <p>Finder 是一款全球视频语伴社交平台，旨在帮助用户通过视频通话进行语言交流与文化分享。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>2. 用户行为规范</h3>
                <p>用户在使用本服务时，应遵守当地法律法规，不得发布违法、色情、暴力、歧视等不良内容。禁止骚扰、辱骂其他用户。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>3. 账号安全</h3>
                <p>用户应妥善保管自己的账号和密码，因用户自身原因导致账号被盗用的，平台不承担责任。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>4. 免责声明</h3>
                <p>本平台不对用户之间的交流内容负责，用户应自行判断交流对象的可信度，注意保护个人财产安全。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>5. 协议修改</h3>
                <p>本平台有权随时修改本协议条款，修改后的协议将在平台公布，继续使用即视为同意。</p>
              </div>
            ) : (
              <div style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.8' }}>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>1. 信息收集</h3>
                <p>我们仅收集您注册时提供的邮箱地址，以及使用视频功能时所需的摄像头和麦克风权限。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>2. 信息使用</h3>
                <p>您的邮箱仅用于账号验证和登录，不会被用于其他商业用途。视频通话内容不会被录制或存储。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>3. 信息保护</h3>
                <p>我们采用行业标准的安全措施保护您的个人信息，防止未经授权的访问、使用或泄露。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>4. Cookie 使用</h3>
                <p>我们使用本地存储技术来维持您的登录状态，这些数据仅存储在您的设备上。</p>
                <h3 style={{ color: '#fff', fontSize: '16px', marginTop: '16px' }}>5. 用户权利</h3>
                <p>您有权随时删除您的账号及相关数据。如有隐私相关问题，请通过平台反馈渠道联系我们。</p>
              </div>
            )}
            <button onClick={() => { setShowAgreement(null); setAgreed(true); }} style={{ width: '100%', padding: '14px', marginTop: '24px', background: '#8b5cf6', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              {t.agreeFirst}
            </button>
          </div>
        </div>
      )}
      {showAgeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '420px', background: '#1e1e1e', borderRadius: '20px', padding: '36px', textAlign: 'center', border: '1px solid #333' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔞</div>
            <h2 style={{ margin: '0 0 12px', fontSize: '22px', color: '#fff' }}>{t.ageTitle}</h2>
            <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.6', marginBottom: '24px' }}>{t.ageDesc}</p>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '15px', color: '#ddd', cursor: 'pointer', marginBottom: '24px' }}>
              <input type="checkbox" checked={ageChecked} onChange={(e) => setAgeChecked(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#8b5cf6', cursor: 'pointer' }} />
              {t.ageConfirm}
            </label>
            <button onClick={confirmAge} disabled={!ageChecked} style={{ width: '100%', padding: '16px', background: ageChecked ? '#8b5cf6' : '#444', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: ageChecked ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
              {t.ageBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
