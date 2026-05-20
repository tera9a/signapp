import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../App'

export default function SignIn() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setError('')
    if (!form.identifier || !form.password)
      return setError('Bütün sahələri doldurun.')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Xəta baş verdi.')
      localStorage.setItem('username', data.username)
      navigate('/welcome')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const s = {
    page: { minHeight:'100vh', background:'#f8f8ff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif', padding:'20px' },
    card: { background:'#fff', borderRadius:'12px', border:'0.5px solid #e8e8f0', padding:'36px', width:'100%', maxWidth:'420px', boxShadow:'0 4px 24px rgba(127,119,221,0.08)' },
    bar: { height:'4px', borderRadius:'4px', background:'linear-gradient(90deg,#7F77DD,#D4537E,#EF9F27)', marginBottom:'28px' },
    title: { fontSize:'22px', fontWeight:'500', color:'#1a1a2e', marginBottom:'4px' },
    sub: { fontSize:'13px', color:'#888', marginBottom:'28px' },
    label: { display:'block', fontSize:'11px', fontWeight:'500', background:'linear-gradient(135deg,#7F77DD,#D4537E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'6px' },
    input: { width:'100%', padding:'10px 14px', borderRadius:'8px', border:'0.5px solid #e0e0f0', background:'#f8f8ff', color:'#1a1a2e', fontSize:'14px', outline:'none', boxSizing:'border-box', marginBottom:'16px' },
    btn: { width:'100%', padding:'11px', borderRadius:'8px', border:'none', background:'linear-gradient(135deg,#7F77DD,#D4537E)', color:'#fff', fontSize:'14px', fontWeight:'500', cursor:'pointer', marginTop:'8px' },
    error: { background:'#fff0f0', border:'0.5px solid #ffcccc', borderRadius:'8px', padding:'10px 14px', color:'#cc4444', fontSize:'13px', marginBottom:'16px' },
    link: { textAlign:'center', marginTop:'16px', fontSize:'13px', color:'#888' }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.bar} />
        <h2 style={s.title}>Xoş gəldiniz</h2>
        <p style={s.sub}>Hesabınıza daxil olun</p>

        {error && <div style={s.error}>{error}</div>}

        <label style={s.label}>Email və ya istifadəçi adı</label>
        <input style={s.input} name="identifier" placeholder="john@example.com" value={form.identifier} onChange={handleChange} />

        <label style={s.label}>Şifrə</label>
        <input style={{ ...s.input, marginBottom: 0 }} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />

        <button style={s.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Gözləyin...' : 'Daxil ol →'}
        </button>

        <p style={s.link}>Hesabınız yoxdur? <Link to="/signup" style={{ color:'#7F77DD', fontWeight:'500' }}>Qeydiyyat</Link></p>
      </div>
    </div>
  )
}