import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'istifadəçi'

  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/signin')
  }

  const s = {
    page: { minHeight:'100vh', background:'#f8f8ff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif' },
    card: { background:'#fff', borderRadius:'12px', border:'0.5px solid #e8e8f0', padding:'36px', width:'100%', maxWidth:'420px', boxShadow:'0 4px 24px rgba(127,119,221,0.08)', textAlign:'center' },
    bar: { height:'4px', borderRadius:'4px', background:'linear-gradient(90deg,#7F77DD,#D4537E,#EF9F27)', marginBottom:'36px' },
    avatar: { width:'68px', height:'68px', borderRadius:'50%', background:'linear-gradient(135deg,#7F77DD,#D4537E)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'24px', fontWeight:'500', color:'#fff' },
    title: { fontSize:'26px', fontWeight:'500', color:'#1a1a2e', marginBottom:'8px' },
    name: { background:'linear-gradient(135deg,#7F77DD,#D4537E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },
    sub: { fontSize:'13px', color:'#888', marginBottom:'32px' },
    btn: { padding:'10px 28px', borderRadius:'8px', border:'0.5px solid #e0e0f0', background:'transparent', color:'#888', cursor:'pointer', fontSize:'13px' }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.bar} />
        <div style={s.avatar}>{username[0].toUpperCase()}</div>
        <h2 style={s.title}>Xoş gəldiniz, <span style={s.name}>{username}</span>!</h2>
        <p style={s.sub}>Sistemə uğurla daxil oldunuz.</p>
        <button style={s.btn} onClick={handleLogout}>← Çıxış et</button>
      </div>
    </div>
  )
}