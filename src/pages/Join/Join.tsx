import Container from '@/components/atoms/Container/Container'
import styles from './Join.module.scss'
import logo from '@/assets/images/logo.svg'
import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import InputText from '@/components/atoms/InputText/InputText'
import DropDown from '@/components/atoms/DropDown/DropDown'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import Button from '@/components/common/Button/Button'
import { checkNickname, signUp } from '@/api/hooks/user/userApi'
import { checkEmail } from '@/api/hooks/user/userApi'
import { sendAuthCode } from '@/api/hooks/user/userApi'
import { verifyAuthCode } from '@/api/hooks/user/userApi'
import { useNavigate } from 'react-router-dom'

const JoinRoutes = ['에브리타임', '제휴 광고제품', '지인 추천']

export const JoinPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [nicknameDuplicated, setNicknameDuplicated] = useState(true)
  const [selectedRoute, setSelectedRoute] = useState('')
  const [checked, setChecked] = useState(false)
  const [authCode, setAuthCode] = useState('')

  const [isDone, setIsDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [clicked, setClicked] = useState(false)
  const [timer, setTimer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)

  const navigate = useNavigate()

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

  useEffect(() => {
    if (
      name.trim() &&
      email.trim() &&
      authorized &&
      password.trim() &&
      rePassword.trim() &&
      nickname.trim() &&
      !nicknameDuplicated &&
      selectedRoute.trim() &&
      checked === true
    ) {
      setIsDone(true)
    } else {
      setIsDone(false)
    }
  }, [
    name,
    email,
    authorized,
    password,
    rePassword,
    nickname,
    nicknameDuplicated,
    selectedRoute,
    checked,
  ])

  useEffect(() => {
    if (rePassword.trim() && password !== rePassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rePassword: '* 비밀번호가 일치하지 않습니다.',
      }))
    } else {
      setErrors((prevErrors) => {
        const { rePassword, ...rest } = prevErrors
        return rest
      })
    }
  }, [password, rePassword])

  const notDone = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = '* 이름을 입력하세요.'
    if (!email.trim()) newErrors.email = '* 이메일을 입력하세요.'
    if (!authorized) newErrors.authorized = '* 인증번호를 입력하고 인증해주세요.'
    if (!password.trim()) newErrors.password = '* 비밀번호를 입력하세요.'
    if (!rePassword.trim()) newErrors.rePassword = '* 비밀번호가 일치하지 않습니다.'
    if (!nickname.trim()) newErrors.nickname = '* 닉네임을 입력하세요.'
    if (nicknameDuplicated) newErrors.nicknameDuplicated = '* 닉네임 중복 확인을 해주세요.'
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

  const submit = async () => {
    try {
      await signUp({
        userName: name,
        userEmail: email,
        userPassword: password,
        userNickname: nickname,
        routeId: JoinRoutes.indexOf(selectedRoute) + 1,
      })
      alert('야금야금의 회원이 되신걸 환영합니다!')
      navigate('/login')
    } catch (error) {
      alert('회원가입에 실패하였습니다.')
    }
  }

  const nicknameDuplicateCheck = async () => {
    try {
      const isDuplicated = await checkNickname(nickname)
      setNicknameDuplicated(isDuplicated)
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        if (!isDuplicated) {
          delete newErrors.nicknameDuplicated
        }
        return newErrors
      })
      if (isDuplicated) {
        alert('이미 존재하는 닉네임입니다!')
      } else {
        alert('닉네임 중복 확인이 완료되었습니다!')
      }
    } catch (error) {
      console.error('닉네임 확인 실패:', error)
      alert('닉네임 확인에 실패하였습니다. 다시 시도해 주세요.')
    }
  }

  const handleRequestAuthCode = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.')
      return
    }
    try {
      const isDuplicated = await checkEmail({ email })
      if (isDuplicated) {
        alert('이미 존재하는 이메일입니다!')
        return
      }
      setTimeLeft(300)
      setTimer(Date.now())
      setClicked(true)
      alert(
        '인증번호가 발송되었습니다. 5분 내에 입력해주세요.\n* 인증메일이 오지 않을 시, 스팸메일함을 확인해주세요.',
      )
      await sendAuthCode(email)
    } catch (error) {
      console.error('인증번호 전송 실패:', error)
      alert('인증번호 전송에 실패하였습니다. 다시 시도해 주세요.')
    }
  }

  const handleVerifyAuthCode = async () => {
    if (!authCode) {
      alert('인증번호를 입력해주세요.')
      return
    }
    try {
      const isVerified = await verifyAuthCode(email, authCode)
      if (isVerified) {
        setAuthorized(true)
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors }
          delete newErrors.authorized
          return newErrors
        })
        setClicked(false)
        alert('인증번호가 확인되었습니다.')
      } else {
        alert('인증번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('인증번호 확인 실패:', error)
      alert('인증번호 확인에 실패하였습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <Container
      size="full-width"
      align="center"
      direction="column"
      gap={60}
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
              onClick={handleRequestAuthCode}
            >
              인증번호 받기
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
              placeholder="이메일로 받으신 인증번호를 입력해주세요."
              width="100%"
              timer={clicked ? `${formatTime(timeLeft)}` : ''}
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
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
              onClick={handleVerifyAuthCode}
            >
              인증번호 확인
            </Button>
          </Container>
          {errors.authorized && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.authorized}</TextBody.XSmall>
          )}
        </Container>

        <Container size="full-width" direction="column" gap={12}>
          <Heading.XSmall>비밀번호</Heading.XSmall>
          <InputText
            placeholder="비밀번호를 입력해주세요."
            width="100%"
            value={password}
            onChange={handleInputChange('password', setPassword)}
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
              onClick={nicknameDuplicateCheck}
            >
              중복 확인
            </Button>
          </Container>
          {errors.nickname && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.nickname}</TextBody.XSmall>
          )}
          {!errors.nickname && errors.nicknameDuplicated && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.nicknameDuplicated}</TextBody.XSmall>
          )}
        </Container>
        <Container size="full-width" direction="column" gap={12} style={{ width: '100%' }}>
          <Heading.XSmall>야금야금을 알게 된 경로</Heading.XSmall>
          <DropDown
            placeholder="경로를 선택해주세요."
            children={JoinRoutes}
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
