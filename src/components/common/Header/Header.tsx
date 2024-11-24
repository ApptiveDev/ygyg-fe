import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.scss'
import logo from '@/assets/images/logo.svg'
import { useEffect, useState } from 'react'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.headerWrapper}>
      <img src={logo} alt="logo" className={styles.logo} onClick={() => navigate('/')} />
      <SearchBar placeholder="검색하고 싶은 양념장을 입력하세요" />
      <div className={styles.textButton}>로그아웃</div>
      <div className={styles.myPage}>마이페이지</div>
    </div>
  )
}
