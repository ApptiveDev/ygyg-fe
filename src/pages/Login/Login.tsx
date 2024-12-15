import Container from '@/components/atoms/Container/Container'
import styles from './Login.module.scss'
import logo from '@/assets/images/logo.svg'
import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import InputText from '@/components/atoms/InputText/InputText'
import Button from '@/components/common/Button/Button'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <Container size="full-width" align="center" direction="column">
      <Container
        gap={30}
        align="center"
        direction="column"
        style={{ marginTop: '60px', marginBottom: '40px' }}
      >
        <img src={logo} className={styles.logo} />
        <Heading.XSmall weight={500}>
          안녕하세요! 양념장 소분 서비스 <span className={styles.point}>야금야금</span>입니다.
        </Heading.XSmall>
      </Container>
      <Container gap={24} align="center" direction="column" style={{ marginBottom: '100px' }}>
        <Heading.Medium>로그인</Heading.Medium>
        <Container gap={14} align="center" direction="column">
          <InputText width="416px" placeholder="아이디" />
          <InputText width="416px" placeholder="비밀번호" isPassword={true} />
        </Container>
        <Button
          theme="red"
          width="416px"
          shadow="0 0 10px rgba(0, 0, 0, 0.15)"
          style={{ borderRadius: '8px', backgroundColor: 'white' }}
        >
          로그인
        </Button>
        <Container gap={8} align="center" direction="column">
          <TextBody.XSmall weight={600} color="var(--gray-color5)">
            아직 야금야금 회원이 아니신가요?
          </TextBody.XSmall>
          <Button
            theme="light-outlined"
            width="416px"
            shadow="0 0 10px rgba(0, 0, 0, 0.15)"
            style={{ borderRadius: '8px' }}
            onClick={() => navigate('/join')}
          >
            회원가입 하기
          </Button>
        </Container>
      </Container>
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
          <img src="image1.jpg" alt="Image 1" className={styles.gridImage} />
          <img src="image2.jpg" alt="Image 2" className={styles.gridImage} />
          <img src="image3.jpg" alt="Image 3" className={styles.gridImage} />
          <img src="image4.jpg" alt="Image 4" className={styles.gridImage} />
        </div>
      </Container>
    </Container>
  )
}
