import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.scss'
import logo from '@/assets/images/logo.svg'
import Container from '@/components/atoms/Container/Container'

interface HeaderProps {
  isHome?: boolean
}

export const Header = ({ isHome = false }: HeaderProps) => {
  const navigate = useNavigate()
  return isHome ? (
    <div className={styles.homeHeaderWrapper}>
      <img src={logo} alt="logo" className={styles.homeLogo} onClick={() => navigate('/')} />
      <Container gap={24}>
        <div className={styles.textButton}>로그아웃</div>
        <div className={styles.myPage}>마이페이지</div>
      </Container>
    </div>
  ) : (
    <div className={styles.headerWrapper}>
      <img src={logo} alt="logo" className={styles.logo} onClick={() => navigate('/')} />
      <SearchBar placeholder="검색하고 싶은 양념장을 입력하세요" />
      <div className={styles.textButton}>로그아웃</div>
      <div className={styles.myPage}>마이페이지</div>
    </div>
  )
}
