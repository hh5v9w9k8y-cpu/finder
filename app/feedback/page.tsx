export default function FeedbackPage() {
  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1>💬 意见反馈</h1>
      <p>如果您有任何建议或遇到问题，请发送邮件至：support@yourapp.com</p>
      <textarea placeholder="写下您的宝贵意见..." style={{ width: '100%', height: '150px', marginTop: '15px', padding: '10px', borderRadius: '8px', border: 'none' }}></textarea>
      <button style={{ marginTop: '15px', padding: '10px 20px', background: '#ff4757', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>提交反馈</button>
    </div>
  );
}
