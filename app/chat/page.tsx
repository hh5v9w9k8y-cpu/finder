'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const messagesEndRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) { alert('请先登录！'); router.push('/login'); }
    else {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      fetchMessages(user.id);
    }
  }, [router]);

  const fetchMessages = async (userId: string) => {
    const supabase = createClient();
    const { data } = await supabase.from('messages').select('*').or(`sender_id.eq.${userId},receiver_id.eq.${userId}`).order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser) return;
    const supabase = createClient();
    const receiverId = '00000000-0000-0000-0000-000000000000'; 
    await supabase.from('messages').insert({ sender_id: currentUser.id, receiver_id: receiverId, content: newMessage });
    setNewMessage('');
    fetchMessages(currentUser.id);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* 【新增】顶部导航栏 + 返回按钮 */}
      <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={() => router.back()} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }}>⬅️</button>
        <h1 style={{ margin: 0, fontSize: '20px' }}>💬 消息</h1>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '10px', textAlign: msg.sender_id === currentUser?.id ? 'right' : 'left' }}>
            <span style={{ display: 'inline-block', padding: '10px 15px', borderRadius: '20px', background: msg.sender_id === currentUser?.id ? '#ff4757' : '#333' }}>{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '20px', borderTop: '1px solid #333', display: 'flex', gap: '10px' }}>
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="输入消息..." style={{ flex: 1, padding: '10px', borderRadius: '20px', border: 'none', outline: 'none' }} />
        <button onClick={handleSend} style={{ padding: '10px 20px', background: '#ff4757', border: 'none', color: '#fff', borderRadius: '20px', cursor: 'pointer' }}>发送</button>
      </div>
    </div>
  );
}