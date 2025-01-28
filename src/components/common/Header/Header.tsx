import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.scss'
import logo from '@/assets/images/logo.svg'
import Container from '@/components/atoms/Container/Container'
import useHeaderScrollEffect from '@/hooks/useHeaderScrollEffect'
import useSignOut from '@/hooks/useSignOut'
import { useState } from 'react'

interface HeaderProps {
  isHome?: boolean
}

export const Header = ({ isHome = false }: HeaderProps) => {
  const navigate = useNavigate()
  const { headerStyle: scrollHeaderStyle } = useHeaderScrollEffect()
  const accessToken = localStorage.getItem('accessToken')
  const signOut = useSignOut()
  const [searchKeyword, setSearchKeyword] = useState('')

  const search = () => {
    if (searchKeyword) navigate(`/list/search/${searchKeyword}`)
  }
  return isHome ? (
    <div className={styles.homeHeaderWrapper} css={scrollHeaderStyle}>
      <img src={logo} alt="logo" className={styles.homeLogo} onClick={() => navigate('/')} />
      {accessToken ? (
        <Container gap={24}>
          <div className={styles.textButton} onClick={signOut}>
            로그아웃
          </div>
          <div className={styles.myPage} onClick={() => navigate('/mypage')}>
            마이페이지
          </div>
        </Container>
      ) : (
        <Container gap={24}>
          <div className={styles.textButton} onClick={() => navigate('/login')}>
            로그인
          </div>
          <div className={styles.textButton} onClick={() => navigate('/join')}>
            회원가입
          </div>
        </Container>
      )}
    </div>
  ) : (
    <div className={styles.headerWrapper} css={scrollHeaderStyle}>
      <img src={logo} alt="logo" className={styles.logo} onClick={() => navigate('/')} />
      <SearchBar
        placeholder="검색하고 싶은 양념장을 입력하세요"
        onChange={(value) => setSearchKeyword(value)}
        onSubmit={search}
      />
      {accessToken ? (
        <Container gap={24}>
          <div className={styles.textButton} onClick={signOut}>
            로그아웃
          </div>
          <div className={styles.myPage} onClick={() => navigate('/mypage')}>
            마이페이지
          </div>
        </Container>
      ) : (
        <Container gap={24}>
          <div className={styles.textButton} onClick={() => navigate('/login')}>
            로그인
          </div>
          <div className={styles.textButton} onClick={() => navigate('/join')}>
            회원가입
          </div>
        </Container>
      )}
    </div>
  )
}
