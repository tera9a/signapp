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

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#111118', border: '1px solid #2a2a3a', borderRadius: '8px', padding: '48px', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ color: '#f0f0ff', marginBottom: '8px' }}>Giriş</h1>
        <p style={{ color: '#555566', marginBottom: '24px' }}>Hesabınıza daxil olun</p>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '12px', color: '#f87171', marginBottom: '16px' }}>{error}</div>}

        <label style={{ color: '#aaa', fontSize: '13px' }}>Email və ya İstifadəçi adı</label>
        <input style={{ width: '100%', background: '#0d0d14', border: '1px solid #2a2a3a', borderRadius: '4px', padding: '10px', color: '#fff', marginBottom: '16px', boxSizing: 'border-box' }} name="identifier" placeholder="john@example.com" value={form.identifier} onChange={handleChange} />

        <label style={{ color: '#aaa', fontSize: '13px' }}>Şifrə</label>
        <input style={{ width: '100%', background: '#0d0d14', border: '1px solid #2a2a3a', borderRadius: '4px', padding: '10px', color: '#fff', marginBottom: '24px', boxSizing: 'border-box' }} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />

        <button style={{ width: '100%', background: '#6366f1', border: 'none', borderRadius: '4px', padding: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Gözləyin...' : 'Daxil ol'}
        </button>

        <p style={{ marginTop: '16px', textAlign: 'center', color: '#555566', fontSize: '13px' }}>
          Hesabınız yoxdur? <Link to="/signup" style={{ color: '#6366f1' }}>Qeydiyyat</Link>
        </p>
      </div>
    </div>
  )
}