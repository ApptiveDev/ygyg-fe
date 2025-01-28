import { useNavigate } from 'react-router-dom'

function useSignOut() {
  const navigate = useNavigate()
  const signOut = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      localStorage.clear()
      navigate('/')
    }
  }

  return signOut
}

export default useSignOut
