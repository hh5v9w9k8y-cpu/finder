'use client';
import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: 1, type: 'text', text: '很高兴认识你！', isMe: false },
    { id: 2, type: 'text', text: '我也很高兴！你的中文说得真好。', isMe: true },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendText = () => {
    if (!inputText.trim()) return;
    const newMsg = { id: Date.now(), type: 'text', text: inputText, isMe: true };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setShowPlusMenu(false);
  };

  const handleSendVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const newMsg = { id: Date.now(), type: 'voice', text: '🎤 语音消息 (0:05)', isMe: true };
      setMessages(prev => [...prev, newMsg]);
    }, 1500);
  };

  const handleSendImage = () => {
    const newMsg = { id: Date.now(), type: 'image', text: '', isMe: true };
    setMessages(prev => [...prev, newMsg]);
    setShowPlusMenu(false);
  };

  const renderMessage = (msg: any) => {
    const baseStyle = {
      maxWidth: '70%', padding: '12px 18px', fontSize: '16px', lineHeight: '1.5',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', wordBreak: 'break-word' as 'break-word'
    };
    const myStyle = { ...baseStyle, background: '#1f6feb', color: '#fff', borderRadius: '20px 20px 4px 20px' };
    const otherStyle = { ...baseStyle, background: '#21262d', color: '#c9d1d9', borderRadius: '20px 20px 20px 4px' };

    if (msg.type === 'image') {
      return (
        <div style={{ ...baseStyle, padding: '4px', background: '#21262d', borderRadius: '20px 20px 20px 4px', width: '200px', height: '150px' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '16px', background: 'linear-gradient(135deg, #30363d, #21262d)', display:'flex', alignItems:'center', justifyContent:'center', color:'#8b949e' }}>🖼️ 图片</div>
        </div>
      );
    }

    return (
      <div style={msg.isMe ? myStyle : otherStyle}>
        {msg.text}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#c9d1d9', fontFamily: "'PingFang SC', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#c9d1d9', cursor: 'pointer', marginRight: '15px', display:'flex', alignItems:'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Sarah</h1>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isMe ? 'flex-end' : 'flex-start' }}>
            {renderMessage(msg)}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={{ background: '#161b22', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {showPlusMenu && (
          <div style={{ padding: '15px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {['相册', '拍照', '位置', '文件'].map((item, i) => (
              <div key={i} onClick={item === '相册' ? handleSendImage : undefined} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: '#21262d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {['🖼️', '📷', '📍', '📁'][i]}
                </div>
                <span style={{ fontSize: '12px', color: '#8b949e' }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setShowPlusMenu(!showPlusMenu)} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', display:'flex', alignItems:'center', transform: showPlusMenu ? 'rotate(45deg)' : 'rotate(0)', transition: '0.3s' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
          <button style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', display:'flex', alignItems:'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
            placeholder="输入消息..." 
            style={{ flex: 1, padding: '12px 18px', borderRadius: '24px', border: '1px solid #30363d', outline: 'none', fontSize: '16px', background: '#0d1117', color:'#c9d1d9' }} 
          />
          {inputText.trim() ? (
            <button onClick={handleSendText} style={{ background: '#1f6feb', border: 'none', color: '#fff', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', width: '40px', height: '40px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          ) : (
            <button onClick={handleSendVoice} style={{ background: isRecording ? '#da3633' : '#21262d', border: 'none', color: isRecording ? '#fff' : '#8b949e', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', width: '40px', height: '40px', borderRadius: '50%', transition: '0.3s' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
