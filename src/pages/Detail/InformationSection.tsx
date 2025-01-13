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
  const [currentLocal, setCurrentLocal] = useState(current)

  const calculatePrice = (people: number) => Math.floor(Number(price) / people)

  const calculatedPrice = calculatePrice(currentLocal)

  const { calculatedAmount, displayUnit } = useSetAmount({
    amount,
    unit,
    people: currentLocal,
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
                  ? value == currentLocal
                    ? styles.current
                    : styles.isIn
                  : ''
              }`}
              onClick={() => setCurrentLocal(value)}
            >
              <TextBody.Small weight={700}>{value}</TextBody.Small>
            </button>
          ))}
        </Container>
        <Container gap={16}>
          {[7, 8, 9, 10].map((value) => (
            <button
              key={value}
              className={`${styles.numberBlock} ${
                value >= min! && value <= max!
                  ? value == currentLocal
                    ? styles.current
                    : styles.isIn
                  : ''
              }`}
              onClick={() => setCurrentLocal(value)}
            >
              <TextBody.Small weight={700}>{value}</TextBody.Small>
            </button>
          ))}
        </Container>
        <TextBody.Small weight={500} style={{ fontSize: '12.1px' }}>
          인원수 버튼으로 예상 가격과 용량을 확인해 보세요!
        </TextBody.Small>
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
