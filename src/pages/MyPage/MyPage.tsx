import React, { useRef } from 'react'
import { Heading } from '@/components/atoms/Text/TextFactory'
import styles from './MyPage.module.scss'
import Card from '@/components/common/CardList/Card/Card'
import MockImage from '@/assets/images/mock-image.png'
import Container from '@/components/atoms/Container/Container'
import Button from '@/components/common/Button/Button'
import { GoArrowUpRight } from 'react-icons/go'
import FloatingButton from '@/components/common/FloatingButton/FloatingButton'
import { WrittenSection } from './WrittenSection'
import { JoinSection } from './JoinSection'
import { CompleteSection } from './CompleteSection'

export const MyPage = () => {
  const nickname = localStorage.getItem('userNickname')
  const name = localStorage.getItem('userName')
  const email = localStorage.getItem('userEmail')

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
      <div className={styles.delete}>회원 탈퇴하기</div>
      <FloatingButton />
    </div>
  )
}
