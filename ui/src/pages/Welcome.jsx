import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'istifadəçi'

  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/signin')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#f0f0ff', marginBottom: '16px' }}>
          Xoş gəldiniz, <span style={{ color: '#6366f1' }}>@{username}</span>!
        </h1>
        <p style={{ color: '#555566', marginBottom: '32px' }}>Sistemə uğurla daxil oldunuz.</p>
        <button style={{ background: 'transparent', border: '1px solid #2a2a3a', borderRadius: '4px', padding: '10px 24px', color: '#f0f0ff', cursor: 'pointer' }} onClick={handleLogout}>
          Çıxış
        </button>
      </div>
    </div>
  )
}