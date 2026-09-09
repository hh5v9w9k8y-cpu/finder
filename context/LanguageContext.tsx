'use client';
import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'zh' | 'en' | 'ja';

const translations: Record<Language, Record<string, string>> = {
  zh: { home: '首页', explore: '发现', live: '视频连线', profile: '我的', langSquare: '语言广场', videoCall: '视频连线', heartMatch: '心动匹配', nearMoments: '附近动态', interactGame: '互动游戏', openVip: '开通 VIP', logout: '退出登录', startMatch: '立即匹配', matching: '匹配中...', next: '下一个', hangUp: '挂断', message: '发消息', nativeLang: '母语', learnLang: '学习语言', sayHi: '打招呼', settings: '语言设置' },
  en: { home: 'Home', explore: 'Explore', live: 'Live', profile: 'Profile', langSquare: 'Language Square', videoCall: 'Video Call', heartMatch: 'Heart Match', nearMoments: 'Nearby', interactGame: 'Games', openVip: 'Open VIP', logout: 'Logout', startMatch: 'Start Match', matching: 'Matching...', next: 'Next', hangUp: 'Hang Up', message: 'Message', nativeLang: 'Native', learnLang: 'Learn', sayHi: 'Say Hi', settings: 'Language' },
  ja: { home: 'ホーム', explore: '発見', live: 'ライブ', profile: 'マイページ', langSquare: '言語広場', videoCall: 'ビデオ通話', heartMatch: '運命のマッチ', nearMoments: '近くの投稿', interactGame: 'ゲーム', openVip: 'VIP', logout: 'ログアウト', startMatch: 'マッチ開始', matching: 'マッチング中...', next: '次へ', hangUp: '切断', message: 'メッセージ', nativeLang: '母語', learnLang: '学習言語', sayHi: '挨拶', settings: '言語設定' }
};

interface LangContextType { lang: Language; setLang: (l: Language) => void; t: (key: string) => string; }
const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('zh');
  const t = (key: string) => translations[lang][key] || key;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
};
