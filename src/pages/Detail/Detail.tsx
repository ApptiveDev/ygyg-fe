import Container from '@/components/atoms/Container/Container'
import { MainSection } from './MainSection'
import sampleImg from '@/assets/images/sample_image.png'
import InformationSection from './InformationSection'
import MapSection from './MapSection'
import CommentSection from './CommentSection'
import { useRef, useState } from 'react'

const exampleValue = {
  thumbnail: sampleImg,
  title: '게시글 제목',
  author: '작성자',
  link: 'http://localhost:5173/detail',
  price: '20000',
  meetAt: '2025-01-24 18:30',
  min: 4,
  max: 8,
  amount: '1',
  unit: 'kg',
  description:
    '설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.',
  current: 6,
  place: '스타벅스 부산대정문점',
  detailPlace: '1층 입구 앞',
  latitude: '35.2314079',
  longitude: '129.0843855',
  category: '소스류',
  isActivate: false,
}

export const DetailPage = () => {
  const [isActivate, setIsActivate] = useState(exampleValue.isActivate)
  const commentSectionRef = useRef<HTMLDivElement>(null)

  const handleActivate = () => {
    const confirmParticipation = window.confirm(
      '정말 소분에 참여하시겠습니까? 참여 시 철회할 수 없습니다.',
    )
    if (confirmParticipation) {
      setIsActivate(true)
    }
  }

  const scrollToCommentSection = () => {
    if (commentSectionRef.current) {
      const headerHeight = 140
      const elementTop = commentSectionRef.current.getBoundingClientRect().top
      const offsetPosition = elementTop + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Container size="full-width" align="center" direction="column" style={{ marginTop: '60px' }}>
      <MainSection
        thumbnail={exampleValue.thumbnail}
        title={exampleValue.title}
        author={exampleValue.author}
        link={exampleValue.link}
        price={exampleValue.price}
        amount={exampleValue.amount}
        unit={exampleValue.unit}
        description={exampleValue.description}
        isActivate={isActivate}
        onGoToCommentSection={scrollToCommentSection}
      />
      <InformationSection
        min={exampleValue.min}
        max={exampleValue.max}
        current={exampleValue.current}
        price={exampleValue.price}
        amount={exampleValue.amount}
        unit={exampleValue.unit}
      />
      <MapSection
        place={exampleValue.place}
        detailPlace={exampleValue.detailPlace}
        meetAt={exampleValue.meetAt}
        category={exampleValue.category}
        latitude={exampleValue.latitude}
        longitude={exampleValue.longitude}
      />
      <div ref={commentSectionRef} />
      <CommentSection isActivate={isActivate} onActivate={handleActivate} />
    </Container>
  )
}
