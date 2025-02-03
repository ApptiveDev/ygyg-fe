import styles from './MyPage.module.scss'
import Container from '@/components/atoms/Container/Container'
import FloatingButton from '@/components/common/FloatingButton/FloatingButton'
import { deleteAccount } from '@/api/hooks/user/userApi'
import { useNavigate } from 'react-router-dom'
import { WrittenSection } from './WrittenSection'
import { JoinSection } from './JoinSection'
import { CompleteSection } from './CompleteSection'

export const MyPage = () => {
  const nickname = localStorage.getItem('userNickname')
  const name = localStorage.getItem('userName')
  const email = localStorage.getItem('userEmail')

  const navigate = useNavigate()

  const submitDelete = async () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      if (window.confirm(`정말로 탈퇴하시겠어요?`)) {
        try {
          await deleteAccount()
          localStorage.clear()
          alert('회원 탈퇴 되었습니다.')
          navigate('/')
        } catch (error) {
          alert('회원 탈퇴에 실패하였습니다.')
        }
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.comment}>
        <div className={styles['comment-header']}>
          <span className={styles['comment-nickname']}>{nickname}</span>님, 오늘도 야금야금 하세요!
        </div>
        <div className={styles['comment-userinfo']}>
          {name} | {email}
        </div>
      </div>
      <Container
        direction="column"
        justify="center"
        align="center"
        style={{
          borderBottom: '1px solid var(--gray-color2)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      ></Container>
      <WrittenSection />
      <JoinSection />
      <CompleteSection />
      <div className={styles.delete} onClick={submitDelete}>
        회원 탈퇴하기
      </div>
      <FloatingButton />
    </div>
  )
}
