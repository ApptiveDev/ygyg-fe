import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.scss'
import logo from '@/assets/images/logo.svg'
import Container from '@/components/atoms/Container/Container'
import useHeaderScrollEffect from '@/hooks/useHeaderScrollEffect'
import { css } from '@emotion/react'

interface HeaderProps {
  isHome?: boolean
}

export const Header = ({ isHome = false }: HeaderProps) => {
  const navigate = useNavigate()
  const { headerStyle: scrollHeaderStyle } = useHeaderScrollEffect()

  return isHome ? (
    <div className={styles.homeHeaderWrapper} css={scrollHeaderStyle}>
      <img src={logo} alt="logo" className={styles.homeLogo} onClick={() => navigate('/')} />
      <Container gap={24}>
        <div className={styles.textButton}>로그아웃</div>
        <div className={styles.myPage}>마이페이지</div>
      </Container>
    </div>
  ) : (
    <div className={styles.headerWrapper} css={scrollHeaderStyle}>
      <img src={logo} alt="logo" className={styles.logo} onClick={() => navigate('/')} />
      <SearchBar placeholder="검색하고 싶은 양념장을 입력하세요" />
      <Container gap={24}>
        <div className={styles.textButton}>로그아웃</div>
        <div className={styles.myPage}>마이페이지</div>
      </Container>
    </div>
  )
}
