'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // 登录、协议、语音房等全屏页面隐藏导航
  const hidePaths = ['/auth', '/agreements', '/voice-room'];
  if (hidePaths.some(p => pathname.startsWith(p))) return null;

  const tabs = [
    { name: '首页', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: '消息', path: '/messages', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { name: '动态', path: '/explore', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: '主页', path: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <nav style={{ 
      position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', 
      borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', 
      padding: '10px 0', paddingBottom: 'calc(10px + env(safe-area-inset-bottom))', zIndex: 50 
    }}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link key={tab.path} href={tab.path} style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', 
            textDecoration: 'none', color: isActive ? '#6366f1' : '#94a3b8', 
            fontSize: '12px', fontWeight: isActive ? '700' : '500' 
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.5" : "2"}>
              <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
            </svg>
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
