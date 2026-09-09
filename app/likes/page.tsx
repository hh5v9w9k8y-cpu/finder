import { createClient } from '@/lib/supabase/server'

export default async function LikesPage() {
  const supabase = await createClient()
  const { data: likes, error } = await supabase.from('likes').select('*').order('created_at', { ascending: false })

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>💖 我的心动记录</h1>
      {!likes || likes.length === 0 ? (
        <p style={{marginTop:'20px', color:'#999'}}>还没有心动记录哦，快去首页看看吧！</p>
      ) : (
        likes.map((like) => (
          <div key={like.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '10px', marginTop: '10px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span><b>{like.from_user}</b> ❤️ <b style={{color:'#ff4757'}}>{like.to_user}</b></span>
            <span style={{fontSize:'12px', color:'#999'}}>{new Date(like.created_at).toLocaleString()}</span>
          </div>
        ))
      )}
      <a href="/" style={{display:'inline-block', marginTop:'30px', padding:'10px 20px', background:'#333', color:'#fff', borderRadius:'20px', textDecoration:'none'}}>⬅️ 返回首页</a>
    </div>
  )
}
