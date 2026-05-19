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
      setSuccess('Qeydiyyat uğurlu! Giriş səhifəsinə yönləndirilirsiniz...')
      setTimeout(() => navigate('/signin'), 1800)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#111118', border: '1px solid #2a2a3a', borderRadius: '8px', padding: '48px', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ color: '#f0f0ff', marginBottom: '8px' }}>Qeydiyyat</h1>
        <p style={{ color: '#555566', marginBottom: '24px' }}>Yeni hesab yarat</p>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '12px', color: '#f87171', marginBottom: '16px' }}>{error}</div>}
        {success && <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '4px', padding: '12px', color: '#4ade80', marginBottom: '16px' }}>{success}</div>}

        <label style={{ color: '#aaa', fontSize: '13px' }}>İstifadəçi adı</label>
        <input style={{ width: '100%', background: '#0d0d14', border: '1px solid #2a2a3a', borderRadius: '4px', padding: '10px', color: '#fff', marginBottom: '16px', boxSizing: 'border-box' }} name="username" placeholder="john_doe" value={form.username} onChange={handleChange} />

        <label style={{ color: '#aaa', fontSize: '13px' }}>Email</label>
        <input style={{ width: '100%', background: '#0d0d14', border: '1px solid #2a2a3a', borderRadius: '4px', padding: '10px', color: '#fff', marginBottom: '16px', boxSizing: 'border-box' }} name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />

        <label style={{ color: '#aaa', fontSize: '13px' }}>Şifrə</label>
        <input style={{ width: '100%', background: '#0d0d14', border: '1px solid #2a2a3a', borderRadius: '4px', padding: '10px', color: '#fff', marginBottom: '16px', boxSizing: 'border-box' }} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />

        <label style={{ color: '#aaa', fontSize: '13px' }}>Şifrəni təsdiqlə</label>
        <input style={{ width: '100%', background: '#0d0d14', border: '1px solid #2a2a3a', borderRadius: '4px', padding: '10px', color: '#fff', marginBottom: '24px', boxSizing: 'border-box' }} name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} />

        <button style={{ width: '100%', background: '#6366f1', border: 'none', borderRadius: '4px', padding: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Gözləyin...' : 'Qeydiyyatdan keç'}
        </button>

        <p style={{ marginTop: '16px', textAlign: 'center', color: '#555566', fontSize: '13px' }}>
          Artıq hesabınız var? <Link to="/signin" style={{ color: '#6366f1' }}>Daxil olun</Link>
        </p>
      </div>
    </div>
  )
}