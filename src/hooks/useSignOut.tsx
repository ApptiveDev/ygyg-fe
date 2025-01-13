import { useNavigate } from 'react-router-dom'

function useSignOut() {
  const navigate = useNavigate()
  const signOut = () => {
    localStorage.clear()
    navigate('/')
  }

  return signOut
}

export default useSignOut
