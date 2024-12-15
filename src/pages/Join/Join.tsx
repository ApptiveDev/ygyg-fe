import Container from '@/components/atoms/Container/Container'
import styles from './Join.module.scss'
import logo from '@/assets/images/logo.svg'
import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import InputText from '@/components/atoms/InputText/InputText'
import DropDown from '@/components/atoms/DropDown/DropDown'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import Button from '@/components/common/Button/Button'

export const JoinPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [authorized, setAuthorized] = useState(true)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [selectedRoute, setSelectedRoute] = useState('')
  const [checked, setChecked] = useState(false)

  const [isDone, setIsDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [clicked, setClicked] = useState(false)
  const [timer, setTimer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(countdown)
    } else if (timeLeft === 0 && timer !== null) {
      setTimer(null)
    }
  }, [timeLeft, timer])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const handleRequestAuth = () => {
    setTimeLeft(300) // 5분
    setTimer(Date.now())
    setClicked(true)
    alert('인증번호가 발송되었습니다. 5분 내에 입력해주세요.')
  }

  useEffect(() => {
    if (
      name.trim() &&
      email.trim() &&
      authorized &&
      id.trim() &&
      password.trim() &&
      rePassword.trim() &&
      nickname.trim() &&
      selectedRoute.trim() &&
      checked === true
    ) {
      setIsDone(true)
    } else {
      setIsDone(false)
    }
  }, [name, email, authorized, id, password, rePassword, nickname, selectedRoute, checked])

  const notDone = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = '* 이름을 입력하세요.'
    if (!email.trim()) newErrors.email = '* 이메일을 입력하세요.'
    if (!authorized) newErrors.authorized = '* 인증번호를 입력하고 인증해주세요.'
    if (!id.trim()) newErrors.id = '* 아이디를 입력하세요.'
    if (!password.trim()) newErrors.password = '* 비밀번호를 입력하세요.'
    if (!rePassword.trim()) newErrors.rePassword = '* 비밀번호를 한번 더 입력하세요.'
    if (!nickname.trim()) newErrors.nickname = '* 닉네임을 입력하세요.'
    if (!selectedRoute.trim()) newErrors.selectedRoute = '* 가입 경로를 선택하세요.'
    if (!checked) newErrors.checked = '* 이용약관 및 개인정보처리방침에 동의해주세요.'

    setErrors(newErrors)
  }

  const handleInputChange =
    (field: string, setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setter(value)

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        if (value.trim()) {
          delete newErrors[field]
        }
        return newErrors
      })
    }
  const handleDropDownSelect = <T extends string>(
    setFunction: React.Dispatch<React.SetStateAction<T>>,
    selectedValue: T,
    errorField: string,
  ) => {
    setFunction(selectedValue)
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors[errorField]
      return newErrors
    })
  }

  const clickCheckBox =
    (field: string, setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      setter(!checked)
      setChecked(!checked)
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        if (!checked) {
          delete newErrors[field]
        }
        return newErrors
      })
    }

  const submit = () => {
    console.log('게시물을 등록합니다.')
  }

  return (
    <Container
      size="full-width"
      align="center"
      direction="column"
      gap={80}
      style={{ marginTop: '40px' }}
    >
      <img src={logo} className={styles.logo} />
      <Container size="full-width" direction="column" gap={24}>
        <Heading.Medium style={{ marginBottom: '10px' }}>
          야금야금 <span className={styles.point}>회원가입</span>하기
        </Heading.Medium>
        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>이름</Heading.XSmall>
          <InputText
            placeholder="이름을 입력해주세요."
            width="100%"
            value={name}
            onChange={handleInputChange('name', setName)}
            error={!!errors.name}
          />
          {errors.name && <TextBody.XSmall style={{ color: 'red' }}>{errors.name}</TextBody.XSmall>}
        </Container>
        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>부산대학교 이메일</Heading.XSmall>
          <Container size="full-width" gap={16}>
            <InputText
              placeholder="부산대학교 이메일을 입력하고 중복확인 버튼을 눌러주세요."
              width="100%"
              value={email}
              onChange={handleInputChange('email', setEmail)}
              error={!!errors.email}
            />
            <Button
              theme="light-outlined"
              width="190px"
              height="64px"
              onClick={handleRequestAuth}
              style={{
                borderRadius: '8px',
                backgroundColor: 'white',
                fontSize: '16px',
                minWidth: '170px',
              }}
            >
              중복 확인
            </Button>
          </Container>
          {errors.email && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.email}</TextBody.XSmall>
          )}
        </Container>
        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>인증번호 입력</Heading.XSmall>
          <Container size="full-width" gap={16}>
            <InputText
              placeholder="우측 버튼을 누르고, 이메일 받은 인증번호를 입력해주세요."
              width="100%"
              timer={clicked ? `${formatTime(timeLeft)}` : ''}
            />
            <Button
              theme="light-outlined"
              width="190px"
              height="64px"
              style={{
                borderRadius: '8px',
                backgroundColor: 'white',
                fontSize: '16px',
                minWidth: '170px',
              }}
            >
              인증번호 받기
            </Button>
          </Container>
          {errors.authorized && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.authorized}</TextBody.XSmall>
          )}
        </Container>
        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>아이디</Heading.XSmall>
          <InputText
            placeholder="아이디를 입력해주세요."
            width="100%"
            value={id}
            onChange={handleInputChange('id', setId)}
            error={!!errors.id}
          />
          {errors.id && <TextBody.XSmall style={{ color: 'red' }}>{errors.id}</TextBody.XSmall>}
        </Container>
        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>비밀번호</Heading.XSmall>
          <InputText
            placeholder="비밀번호를 입력해주세요."
            width="100%"
            value={password}
            onChange={handleInputChange('password', setPassword)}
            error={!!errors.password}
          />
          {errors.password && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.password}</TextBody.XSmall>
          )}
        </Container>
        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>비밀번호 확인</Heading.XSmall>
          <InputText
            placeholder="비밀번호를 다시 한번 입력해주세요."
            width="100%"
            value={rePassword}
            onChange={handleInputChange('rePassword', setRePassword)}
            error={!!errors.rePassword}
          />
          {errors.rePassword && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.rePassword}</TextBody.XSmall>
          )}
        </Container>
        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>닉네임</Heading.XSmall>
          <Container size="full-width" gap={16}>
            <InputText
              placeholder="닉네임을 입력해주세요."
              width="100%"
              value={nickname}
              onChange={handleInputChange('nickname', setNickname)}
              error={!!errors.nickname}
            />
            <Button
              theme="light-outlined"
              width="190px"
              height="64px"
              style={{
                borderRadius: '8px',
                backgroundColor: 'white',
                fontSize: '16px',
                minWidth: '170px',
              }}
            >
              중복 확인
            </Button>
          </Container>
          {errors.nickname && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.nickname}</TextBody.XSmall>
          )}
        </Container>
        <Container size="full-width" direction="column" gap={12} style={{ width: '100%' }}>
          <Heading.XSmall>야금야금을 알게 된 경로</Heading.XSmall>
          <DropDown
            placeholder="경로를 선택해주세요."
            children={['에브리타임', '제휴 광고제품', '지인 추천', '기타']}
            width="300px"
            setValue={(selectedValue) =>
              handleDropDownSelect(setSelectedRoute, selectedValue, 'selectedRoute')
            }
          />
          {errors.selectedRoute && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.selectedRoute}</TextBody.XSmall>
          )}
        </Container>
      </Container>
      <Container direction="column" gap={24}>
        <Container gap="7px" direction="column" align="center" style={{ width: '100%' }}>
          <Container
            size="full-width"
            direction="row"
            justify="center"
            align="center"
            style={{ gap: '8px' }}
          >
            <div
              className={`${styles.checkBox} ${checked ? styles.selected : ''}`}
              onClick={clickCheckBox('checked', setChecked)}
            >
              {checked ? <FaCheck style={{ color: 'white' }} /> : null}
            </div>
            <TextBody.Small style={{ fontWeight: '700' }}>
              [필수] 이용약관 및 개인정보처리방침에 동의합니다.
            </TextBody.Small>
          </Container>

          <Container gap={8}>
            <div className={styles.link} onClick={() => {}}>
              <TextBody.XSmall>이용약관 보기</TextBody.XSmall>
            </div>
            <div className={styles.link} onClick={() => {}}>
              <TextBody.XSmall>개인정보처리방침 보기</TextBody.XSmall>
            </div>
          </Container>
          {errors.checked && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.checked}</TextBody.XSmall>
          )}
        </Container>
        <Container
          size="full-width"
          direction="row"
          justify="center"
          align="center"
          style={{ marginBottom: '52px' }}
        >
          <Button
            theme={isDone ? 'red' : 'gray'}
            shadow="0 0 10px rgba(0,0,0,0.2)"
            onClick={isDone ? submit : notDone}
            style={{ borderRadius: '8px' }}
          >
            회원가입 하고 야금야금 하러 가기
          </Button>
        </Container>
      </Container>
    </Container>
  )
}
