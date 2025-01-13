import styles from '@/components/common/FloatingButton/FloatingButton.module.scss'
import FloatingImage from '@/assets/icons/floating-icon.svg'
import { useNavigate } from 'react-router-dom'

const FloatingButton: React.FC = () => {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  const handleClick = () => {
    if (accessToken) {
      navigate('/post')
    } else {
      alert('로그인 후 글 작성이 가능합니다.')
      navigate('/login')
    }
  }
  return (
    <button className={styles.floatingBtn} onClick={handleClick}>
      <img src={FloatingImage} alt="Floating Icon" className={styles.floatingIcon} />
      <span className={styles.floatingText}>
        새 양념장
        <br />
        소분하러 가기
      </span>
    </button>
  )
}

export default FloatingButton
