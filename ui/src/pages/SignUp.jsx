import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../App'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setError(''); setSuccess('')
    if (!form.username || !form.email || !form.password || !form.confirmPassword)
      return setError('Bütün sahələri doldurun.')
    if (form.password !== form.confirmPassword)
      return setError('Şifrələr uyğun gəlmir.')
    if (form.password.length < 6)
      return setError('Şifrə minimum 6 simvol olmalıdır.')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Xəta baş verdi.')
      setSuccess('Qeydiyyat uğurlu! Yönləndirilirsiniz...')
      setTimeout(() => navigate('/signin'), 1800)
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
    success: { background:'#f0fff4', border:'0.5px solid #ccffdd', borderRadius:'8px', padding:'10px 14px', color:'#44aa66', fontSize:'13px', marginBottom:'16px' },
    link: { textAlign:'center', marginTop:'16px', fontSize:'13px', color:'#888' }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.bar} />
        <h2 style={s.title}>Hesab yarat</h2>
        <p style={s.sub}>Bir neçə saniyədə qeydiyyatdan keç</p>

        {error && <div style={s.error}>{error}</div>}
        {success && <div style={s.success}>{success}</div>}

        <label style={s.label}>İstifadəçi adı</label>
        <input style={s.input} name="username" placeholder="john_doe" value={form.username} onChange={handleChange} />

        <label style={s.label}>Email</label>
        <input style={s.input} name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />

        <label style={s.label}>Şifrə</label>
        <input style={s.input} name="password" type="password" placeholder="Minimum 6 simvol" value={form.password} onChange={handleChange} />

        <label style={s.label}>Şifrəni təsdiqlə</label>
        <input style={{ ...s.input, marginBottom: 0 }} name="confirmPassword" type="password" placeholder="Şifrəni təkrarla" value={form.confirmPassword} onChange={handleChange} />

        <button style={s.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Gözləyin...' : 'Davam et →'}
        </button>

        <p style={s.link}>Artıq hesabınız var? <Link to="/signin" style={{ color:'#7F77DD', fontWeight:'500' }}>Daxil olun</Link></p>
      </div>
    </div>
  )
}