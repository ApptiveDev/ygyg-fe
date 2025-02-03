import Container from '@/components/atoms/Container/Container'
import styles from './Login.module.scss'
import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import InputText from '@/components/atoms/InputText/InputText'
import Button from '@/components/common/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthProvider } from '@/provider/Auth/authApi'
import login1Image from '@/assets/images/login1_image.png'
import login2Image from '@/assets/images/login2_image.png'
import login3Image from '@/assets/images/login3_image.png'
import login4Image from '@/assets/images/login4_image.png'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [fullEmail, setFullEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setFullEmail(email + '@pusan.ac.kr')
  }, [email])

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setter(value)
    }

  const login = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력해주세요.')
    } else {
      try {
        await AuthProvider({ userEmail: fullEmail, userPassword: password })
        navigate('/')
      } catch (error) {
        console.error('Login failed:', error)
        alert('로그인에 실패하였습니다. 다시 시도해 주세요.')
      }
    }
  }

  return (
    <Container size="full-width" align="center" direction="column">
      <Container
        align="center"
        direction="column"
        style={{ marginTop: '130px', marginBottom: '40px' }}
      >
        <Heading.XSmall weight={500}>
          안녕하세요! 양념장 소분 중개 플랫폼 <span className={styles.point}>야금야금</span>입니다.
        </Heading.XSmall>
      </Container>
      <form onSubmit={login}>
        <Container gap={24} align="center" direction="column" style={{ marginBottom: '100px' }}>
          <Heading.Medium>로그인</Heading.Medium>
          <Container gap={14} align="center" direction="column">
            <InputText
              width="416px"
              placeholder="이메일"
              value={email}
              icon={<div>@pusan.ac.kr</div>}
              onChange={handleInputChange(setEmail)}
            />
            <InputText
              width="416px"
              placeholder="비밀번호"
              isPassword={true}
              value={password}
              onChange={handleInputChange(setPassword)}
            />
          </Container>
          <Button
            className={`${styles.loginButton} ${!email || !password ? styles.gray : ''}`}
            theme={email && password ? 'red' : 'gray'}
            width="416px"
            shadow="0 0 10px rgba(0, 0, 0, 0.15)"
            style={{ borderRadius: '8px' }}
            type="submit"
          >
            로그인
          </Button>
          <Container gap={8} align="center" direction="column">
            <TextBody.XSmall weight={600} color="var(--gray-color5)">
              아직 야금야금 회원이 아니신가요?
            </TextBody.XSmall>
            <Button
              className={styles.signUpButton}
              theme="light-outlined"
              width="416px"
              shadow="0 0 10px rgba(0, 0, 0, 0.15)"
              style={{ borderRadius: '8px' }}
              type="button"
              onClick={() => navigate('/join')}
            >
              회원가입 하기
            </Button>
          </Container>
        </Container>
      </form>

      <PictureArea />
    </Container>
  )
}

export const PictureArea = () => {
  return (
    <Container
      size="full-width"
      align="center"
      direction="column"
      gap={40}
      style={{ marginBottom: '55px' }}
    >
      <Heading.XSmall>실제 소분은 이렇게 이루어지고 있어요!</Heading.XSmall>
      <Container align="center" direction="column">
        <div className={styles.gridContainer}>
          <img src={login1Image} alt="Image 1" className={styles.gridImage} />
          <img src={login2Image} alt="Image 2" className={styles.gridImage} />
          <img src={login3Image} alt="Image 3" className={styles.gridImage} />
          <img src={login4Image} alt="Image 4" className={styles.gridImage} />
        </div>
      </Container>
    </Container>
  )
}
