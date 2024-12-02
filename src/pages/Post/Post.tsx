import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import styles from './Post.module.scss'
import { FaCheck } from 'react-icons/fa6'
import { PiUploadSimpleBold } from 'react-icons/pi'
import Container from '@/components/atoms/Container/Container'
import Category from '@/components/common/Category/Category'
import InputText from '@/components/atoms/InputText/InputText'
import { useState, useEffect, useRef } from 'react'
import { MdOutlineCalendarToday } from 'react-icons/md'
import Button from '@/components/common/Button/Button'
import { TextArea } from '@/components/atoms/TextArea/TextArea'
import DropDown from '@/components/atoms/DropDown/DropDown'
import { Calendar } from '@/components/features/Calendar/Calendar'
import { CalendarIcon } from '@/components/features/CalendarIcon/CalendarIcon'
import Map from '@/components/features/Map/Map'

function NewPicture() {
  return (
    <Container>이미지를 추가해주세요. (미추가 시 기본 일러스트로 게시글이 업로드됩니다.)</Container>
  )
}

export const PostPage = () => {
  const categories = ['액체류', '소스류', '가루류', '잼류', '기타']
  const units = ['ml', 'L', 'g', 'kg']
  const thisYear = new Date().getFullYear()
  const time = ['오전', '오후']
  const hour = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const minute = ['00', '15', '30', '45']

  const [checked, setChecked] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedHour, setSelectedHour] = useState('')
  const [selectedMinute, setSelectedMinute] = useState('')
  const [selectedDateInfo, setSelectedDateInfo] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: '',
  })

  const [category, setCategory] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [minPeople, setMinPeople] = useState<string>('')
  const [maxPeople, setMaxPeople] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [location, setLocation] = useState<string>('')

  const [unit, setUnit] = useState<string>('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (
      category &&
      title.trim() &&
      price.trim() &&
      minPeople.trim() &&
      maxPeople.trim() &&
      content.trim() &&
      checked === true
    ) {
      setIsDone(true)
    } else {
      setIsDone(false)
    }
  }, [category, title, price, minPeople, maxPeople, content, checked])

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

  const notDone = () => {
    const newErrors: Record<string, string> = {}

    if (!category) newErrors.category = '* 카테고리를 선택하세요'
    if (!title.trim()) newErrors.title = '* 제목을 입력하세요.'
    if (!price.trim()) newErrors.price = '* 가격을 입력하세요.'
    if (!amount.trim()) newErrors.amount = '* 용량을 입력하세요.'
    if (!unit.trim()) newErrors.unit = '* 단위를 선택하세요.'
    if (!minPeople.trim()) newErrors.minPeople = '* 최소 인원을 선택하세요.'
    if (!maxPeople.trim()) newErrors.maxPeople = '* 최대 인원을 선택하세요.'
    if (!selectedDateInfo.date.trim()) newErrors.selectedDate = '* 날짜를 선택하세요.'
    if (!selectedTime.trim()) newErrors.selectedTime = '* 시간대를 선택하세요.'
    if (!selectedHour.trim()) newErrors.selectedHour = '* 시를 선택하세요.'
    if (!selectedMinute.trim()) newErrors.selectedMinute = '* 분을 선택하세요.'
    if (!content.trim()) newErrors.content = '* 내용을 입력하세요.'
    if (!checked) newErrors.checked = '* 노쇼 방지 동참에 동의해주세요.'

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

  const handleTextAreaChange =
    (field: string, setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleCategorySelect = (selectedCategory: string | null) => {
    setCategory(selectedCategory)
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors.category
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

  const submit = () => {
    console.log('게시물을 등록합니다.')
  }

  return (
    <Container size="full-width" direction="column">
      <Heading.Medium className={styles.mainTitle}>양념장 소분 게시글 작성하기</Heading.Medium>
      <Container size="full-width" direction="column" style={{ gap: '36px', marginBottom: '46px' }}>
        <Container gap="7px">
          <Heading.XSmall>
            소분하고자 하는 양념의 카테고리를 선택해주세요.{' '}
            <span style={{ color: 'var(--point-color)' }}>*</span>
          </Heading.XSmall>
          {errors.category && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.category}</TextBody.XSmall>
          )}
        </Container>

        <Category text={categories} onSelect={handleCategorySelect} />
      </Container>
      <Container size="full-width" direction="column" style={{ gap: '23px', marginBottom: '46px' }}>
        <Heading.XSmall>
          게시글 제목 <span style={{ color: 'var(--point-color)' }}>*</span>
        </Heading.XSmall>
        <Container gap="7px" direction="column" style={{ width: '100%' }}>
          <InputText
            placeholder="제목을 입력해주세요."
            width="100%"
            value={title}
            onChange={handleInputChange('title', setTitle)}
            error={!!errors.title}
          />
          {errors.title && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.title}</TextBody.XSmall>
          )}
        </Container>
      </Container>
      <Container size="full-width" direction="column" style={{ gap: '23px', marginBottom: '46px' }}>
        <Heading.XSmall>
          양념장 이미지 <span style={{ color: 'var(--point-color)' }}>*</span>
        </Heading.XSmall>
        <Container gap="7px" direction="column" style={{ width: '100%' }}>
          <NewPicture />
          <PiUploadSimpleBold style={{ color: 'var(--point-color)' }} />
        </Container>
      </Container>
      <Container size="full-width" direction="column" style={{ gap: '23px', marginBottom: '46px' }}>
        <Heading.XSmall>온라인 구매의 경우 제품 링크</Heading.XSmall>
        <InputText
          placeholder="링크를 입력해주세요."
          width="100%"
          value={link}
          onChange={handleInputChange('link', setLink)}
        />
      </Container>
      <Container size="full-width" gap={23}>
        <Container
          size={{ width: '50%', height: '100%' }}
          direction="column"
          style={{ gap: '16px', marginBottom: '46px' }}
        >
          <Heading.XSmall>
            함께 구매하고자 하는 양념장의 가격{' '}
            <span style={{ color: 'var(--point-color)' }}>*</span>
          </Heading.XSmall>

          <Container gap="7px" direction="column" style={{ width: '100%' }}>
            <Container align="center" gap={17} style={{ width: '95%' }}>
              <InputText
                placeholder="양념장 총액을 입력해주세요."
                value={price}
                onChange={handleInputChange('price', setPrice)}
                error={!!errors.price}
              />
              <TextBody.Large style={{ fontWeight: '500' }}>원</TextBody.Large>
            </Container>

            {errors.content && (
              <TextBody.XSmall style={{ color: 'red' }}>{errors.price}</TextBody.XSmall>
            )}
          </Container>
        </Container>
        <Container
          size={{ width: '50%', height: '100%' }}
          direction="column"
          style={{ gap: '16px', marginBottom: '46px' }}
        >
          <Heading.XSmall>
            소분할 양념장 총 용량 <span style={{ color: 'var(--point-color)' }}>*</span>
          </Heading.XSmall>

          <Container gap="7px" direction="column" style={{ width: '100%' }}>
            <Container align="center" gap={17} style={{ width: '100%' }}>
              <InputText
                placeholder="숫자만 입력해주세요."
                value={amount}
                onChange={handleInputChange('amount', setAmount)}
                error={!!errors.amount}
              />
              <DropDown
                placeholder={'단위'}
                children={units}
                width="120px"
                setValue={(selectedValue) => handleDropDownSelect(setUnit, selectedValue, 'unit')}
              />
            </Container>
            <Container style={{ width: '100%' }}>
              <div style={{ flexGrow: '1' }}>
                {errors.content && (
                  <TextBody.XSmall style={{ color: 'red' }}>{errors.amount}</TextBody.XSmall>
                )}
              </div>
              <div style={{ width: '120px' }}>
                {errors.content && (
                  <TextBody.XSmall style={{ color: 'red' }}>{errors.unit}</TextBody.XSmall>
                )}
              </div>
            </Container>
          </Container>
        </Container>
      </Container>

      <Container size="full-width" direction="column" style={{ gap: '23px', marginBottom: '46px' }}>
        <Heading.XSmall>
          원하는 소분 인원 <span style={{ color: 'var(--point-color)' }}>*</span>
        </Heading.XSmall>

        <Container style={{ width: '100%', gap: '20px' }}>
          <Container gap="7px" direction="column" style={{ width: '100%' }}>
            <InputText
              placeholder="숫자를 선택하면 최소 인원이 나타나요."
              width="100%"
              value={minPeople}
              onChange={handleInputChange('minPeople', setMinPeople)}
              error={!!errors.minPeople}
            />
            {errors.minPeople && (
              <TextBody.XSmall style={{ color: 'red' }}>{errors.minPeople}</TextBody.XSmall>
            )}
          </Container>
          <Container gap="7px" direction="column" style={{ width: '100%' }}>
            <InputText
              placeholder="숫자를 선택하면 최대 인원이 나타나요."
              width="100%"
              value={maxPeople}
              onChange={handleInputChange('maxPeople', setMaxPeople)}
              error={!!errors.maxPeople}
            />
            {errors.maxPeople && (
              <TextBody.XSmall style={{ color: 'red' }}>{errors.maxPeople}</TextBody.XSmall>
            )}
          </Container>
        </Container>
      </Container>
      <Container size="full-width" direction="column" style={{ gap: '33px', marginBottom: '46px' }}>
        <Heading.XSmall>
          소분을 원하는 날짜와 시간 <span style={{ color: 'var(--point-color)' }}>*</span>
        </Heading.XSmall>

        <Container justify="space-between" style={{ width: '100%', gap: '20px' }}>
          <Container direction="column" gap={10}>
            <Container
              gap="13px"
              direction="row"
              justify="flex-start"
              align="center"
              style={{ width: '100%' }}
            >
              <CalendarIcon
                selectedDateInfo={selectedDateInfo}
                setSelectedDateInfo={setSelectedDateInfo}
                setErrors={setErrors}
              />
              <div className={styles.textBox}>{selectedDateInfo.year}</div>
              <TextBody.Large style={{ fontWeight: '500' }}>년</TextBody.Large>
              <div className={styles.textBox}>{selectedDateInfo.month}</div>
              <TextBody.Large style={{ fontWeight: '500' }}>월</TextBody.Large>
              <div className={styles.textBox}>{selectedDateInfo.date}</div>
              <TextBody.Large style={{ fontWeight: '500' }}>일</TextBody.Large>
            </Container>
            {errors.selectedDate && (
              <TextBody.XSmall style={{ color: 'red' }}>{errors.selectedDate}</TextBody.XSmall>
            )}
          </Container>
          <Container gap="13px" direction="row" justify="center" align="center">
            <Container direction="column" gap={10}>
              <DropDown
                placeholder={'오전/오후'}
                children={time}
                width="135px"
                setValue={(selectedValue) =>
                  handleDropDownSelect(setSelectedTime, selectedValue, 'selectedTime')
                }
              />
              {errors.selectedTime && (
                <TextBody.XSmall style={{ color: 'red' }}>{errors.selectedTime}</TextBody.XSmall>
              )}
            </Container>
            <Container direction="column" gap={10}>
              <Container align="center" gap={10}>
                <DropDown
                  placeholder={'HH'}
                  children={hour}
                  width="110px"
                  setValue={(selectedValue) =>
                    handleDropDownSelect(setSelectedHour, selectedValue, 'selectedHour')
                  }
                />
                <TextBody.Large style={{ fontWeight: '500' }}>시</TextBody.Large>
              </Container>
              {errors.selectedHour && (
                <TextBody.XSmall style={{ color: 'red' }}>{errors.selectedHour}</TextBody.XSmall>
              )}
            </Container>

            <Container direction="column" gap={10}>
              <Container align="center" gap={10}>
                <DropDown
                  placeholder={'MM'}
                  children={minute}
                  width="110px"
                  setValue={(selectedValue) =>
                    handleDropDownSelect(setSelectedMinute, selectedValue, 'selectedMinute')
                  }
                />
                <TextBody.Large style={{ fontWeight: '500' }}>분</TextBody.Large>
              </Container>
              {errors.selectedMinute && (
                <TextBody.XSmall style={{ color: 'red' }}>{errors.selectedMinute}</TextBody.XSmall>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
      <Container size="full-width" direction="column" style={{ gap: '23px', marginBottom: '46px' }}>
        <Heading.XSmall>
          게시글 내용 <span style={{ color: 'var(--point-color)' }}>*</span>
        </Heading.XSmall>

        <Container gap="7px" direction="column" style={{ width: '100%' }}>
          <TextArea
            placeholder="자세한 소분 내용을 입력해주세요."
            width="100%"
            height="200px"
            value={content}
            customSize="large"
            onChange={handleTextAreaChange('content', setContent)}
            error={!!errors.content}
          />
          {errors.content && (
            <TextBody.XSmall style={{ color: 'red' }}>{errors.content}</TextBody.XSmall>
          )}
        </Container>
      </Container>
      <Container size="full-width" direction="column" style={{ gap: '23px', marginBottom: '46px' }}>
        <Heading.XSmall>
          소분 희망 장소
          <span style={{ color: 'var(--point-color)' }}> *</span>
        </Heading.XSmall>
        <Map />
        <TextBody.Medium style={{ fontWeight: '500' }}>상세 위치(선택)</TextBody.Medium>
        <InputText placeholder="내용을 입력해주세요" width="100%" />
      </Container>
      <Container
        gap="7px"
        direction="column"
        align="center"
        style={{ width: '100%', marginBottom: '46px' }}
      >
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
            더 나은 야금야금 서비스를 위해 노쇼 방지에 동참해주세요.{' '}
            <span style={{ color: 'var(--point-color)' }}>*</span>
          </TextBody.Small>
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
        >
          소분 게시물 등록하기
        </Button>
      </Container>
    </Container>
  )
}
