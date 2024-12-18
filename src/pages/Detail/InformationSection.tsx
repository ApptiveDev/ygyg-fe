import Container from '@/components/atoms/Container/Container'
import styles from './Detail.module.scss'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import { useState } from 'react'
import useFormatPrice from '@/hooks/useFormatPrice'
import useSetAmount from '@/hooks/useSetAmount'

interface InformationProps {
  min: number
  max: number
  current: number
  price: string
  amount: string
  unit: string
}

function InformationSection({ min, max, current, price, amount, unit }: InformationProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  // 동적 예상 값 계산 함수
  const calculatePrice = (people: number) => Math.floor(Number(price) / people)

  // 화면에 표시할 값 설정
  const selectedPeople = hovered || current
  const calculatedPrice = calculatePrice(selectedPeople)

  const { calculatedAmount, displayUnit } = useSetAmount({
    amount,
    unit,
    people: selectedPeople,
  })

  return (
    <Container
      size="full-width"
      align="flex-start"
      gap={60}
      style={{
        padding: '60px 0 80px 0',
        borderBottom: '1px solid var(--gray-color2)',
        boxSizing: 'border-box',
      }}
    >
      <Container direction="column" gap={16}>
        <Container gap={16}>
          {[2, 3, 4, 5, 6].map((value) => (
            <button
              key={value}
              className={`${styles.numberBlock} ${
                value >= min! && value <= max!
                  ? value == current
                    ? styles.current
                    : styles.isIn
                  : ''
              }`}
              onMouseEnter={() => {
                if (value >= min! && value <= max!) {
                  setHovered(value)
                }
              }}
              onMouseLeave={() => {
                if (value >= min! && value <= max!) {
                  setHovered(null)
                }
              }}
            >
              <TextBody.Small weight={700}>{value}</TextBody.Small>
            </button>
          ))}
        </Container>
        <Container gap={16}>
          {[7, 8, 9].map((value) => (
            <button
              key={value}
              className={`${styles.numberBlock} ${
                value >= min! && value <= max!
                  ? value == current
                    ? styles.current
                    : styles.isIn
                  : ''
              }`}
              onMouseEnter={() => {
                if (value >= min! && value <= max!) {
                  setHovered(value)
                }
              }}
              onMouseLeave={() => {
                if (value >= min! && value <= max!) {
                  setHovered(null)
                }
              }}
            >
              <TextBody.Small weight={700}>{value}</TextBody.Small>
            </button>
          ))}
        </Container>
        <TextBody.XSmall weight={500} style={{ fontSize: '12px' }}>
          마우스를 대면 인원에 따른 예상 가격과 예상 용량을 확인할 수 있어요!
        </TextBody.XSmall>
      </Container>
      <Container size="full-width" direction="column" gap={30}>
        <Container size="full-width" justify="space-between">
          <TextBody.Medium weight={700} color="var(--gray-color3)">
            현재 소분 참여 인원
          </TextBody.Medium>
          <TextBody.Large weight={700} color="var(--gray-color3)">
            {current} 명
          </TextBody.Large>
        </Container>
        <Container size="full-width" justify="space-between">
          <TextBody.Medium weight={700}>예상 가격</TextBody.Medium>
          <TextBody.Large weight={700}>{useFormatPrice(calculatedPrice)} 원</TextBody.Large>
        </Container>
        <Container size="full-width" justify="space-between">
          <TextBody.Medium weight={700}>예상 용량</TextBody.Medium>
          <TextBody.Large weight={700}>
            {calculatedAmount} {displayUnit}
          </TextBody.Large>
        </Container>
      </Container>
    </Container>
  )
}

export default InformationSection
