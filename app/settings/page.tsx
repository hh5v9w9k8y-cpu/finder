'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // 模拟登出逻辑
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1>⚙️ 设置</h1>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e00',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: isLoggingOut ? 0.7 : 1,
          }}
        >
          {isLoggingOut ? '正在退出...' : '退出登录'}
        </button>
      </div>
    </div>
  );
}
