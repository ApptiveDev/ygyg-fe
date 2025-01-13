import Container from '@/components/atoms/Container/Container'
import styles from './Detail.module.scss'
import sampleImg from '@/assets/images/sample_image.png'
import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import useFormatPrice from '@/hooks/useFormatPrice'
import Button from '@/components/common/Button/Button'
import { useState } from 'react'

interface MainProps {
  thumbnail: string
  title: string
  author: string
  link: string
  price: string
  amount: string
  unit: string
  description: string
  isActivate: boolean
  isMyPosting: boolean
  onGoToCommentSection: () => void
}

export const MainSection = ({
  thumbnail,
  title,
  author,
  link,
  price,
  amount,
  unit,
  description,
  isActivate,
  isMyPosting,
  onGoToCommentSection,
}: MainProps) => {
  return (
    <Container size="full-width" align="flex-end" gap={50}>
      <img src={thumbnail} alt="product-image" className={styles.productImage} />
      <Container
        align="flex-start"
        direction="column"
        style={{
          height: '435px',
          minWidth: '258px',
          flexGrow: 1,
          borderBottom: '1px solid var(--gray-color2)',
        }}
        justify="space-between"
      >
        <Container align="flex-start" direction="column" size="full-width" gap={15}>
          <Heading.Small>{title}</Heading.Small>
          <TextBody.Small className={styles.author}>{author}</TextBody.Small>
          <Container size="full-width" justify="space-between" gap={11}>
            <TextBody.Small className={styles.smallTitle} weight={700}>
              구매 링크
            </TextBody.Small>
            <a href={link} className={styles.link} target="_blank">
              {link}
            </a>
          </Container>
          <Container size="full-width" justify="space-between" gap={11}>
            <TextBody.Small className={styles.smallTitle} weight={700}>
              구매 가격
            </TextBody.Small>
            <TextBody.Medium className={styles.infoText}>
              {useFormatPrice(Number(price))} 원
            </TextBody.Medium>
          </Container>
          <Container size="full-width" justify="space-between" gap={11}>
            <TextBody.Small className={styles.smallTitle} weight={700}>
              총 용량
            </TextBody.Small>
            <TextBody.Medium className={styles.infoText}>
              {amount} {unit}
            </TextBody.Medium>
          </Container>
          <TextBody.Medium
            style={{
              boxSizing: 'border-box',
              lineHeight: '1.5rem',
              flexGrow: '1',
              maxHeight: isMyPosting ? '85px' : '145px',
              overflowY: 'scroll',
            }}
          >
            {description}
          </TextBody.Medium>
        </Container>
        {isMyPosting ? (
          <Container size="full-width" gap={20}>
            <Button
              width="100%"
              theme="white"
              height="45px"
              shadow="0 0 10px rgba(0,0,0,0.1)"
              style={{ fontSize: '16px', minWidth: '130px' }}
            >
              게시글 수정하기
            </Button>
            <Button
              width="100%"
              theme="light-gray"
              height="45px"
              shadow="0 0 10px rgba(0,0,0,0.1)"
              style={{ fontSize: '16px', minWidth: '130px' }}
            >
              게시글 삭제하기
            </Button>
          </Container>
        ) : null}

        {isMyPosting ? (
          <Container
            size="full-width"
            direction="column"
            align="center"
            justify="flex-start"
            style={{ height: '85px', marginBottom: '8px' }}
          >
            <Button
              theme="red"
              width="100%"
              height="60px"
              style={{ borderRadius: '12px' }}
              onClick={onGoToCommentSection}
            >
              댓글 창 바로가기
            </Button>
          </Container>
        ) : isActivate ? (
          <Container
            size="full-width"
            direction="column"
            align="center"
            justify="flex-start"
            style={{ height: '85px', marginBottom: '8px' }}
          >
            <Button
              theme="red"
              width="100%"
              height="60px"
              style={{ borderRadius: '12px' }}
              onClick={onGoToCommentSection}
            >
              댓글 창 바로가기
            </Button>
          </Container>
        ) : (
          <Container
            size="full-width"
            direction="column"
            align="center"
            justify="flex-start"
            gap={10}
            style={{ height: '85px', marginBottom: '8px' }}
          >
            <Button
              theme="gray"
              width="100%"
              height="60px"
              shadow="0 0 10px rgba(0,0,0,0.1)"
              style={{ borderRadius: '12px', cursor: 'auto' }}
            >
              댓글 창 바로가기
            </Button>
            <TextBody.XSmall weight={700} color="var(--gray-color3)">
              소분에 참여하면 버튼이 활성화됩니다.
            </TextBody.XSmall>
          </Container>
        )}
      </Container>
    </Container>
  )
}
