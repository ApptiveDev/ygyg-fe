import Container from '@/components/atoms/Container/Container'
import { MainSection } from './MainSection'
import sampleImg from '@/assets/images/sample_image.png'

const exampleValue = {
  thumbnail: sampleImg,
  title: '게시글 제목',
  author: '작성자',
  link: 'http://localhost:5173/detail',
  price: '20000',
  date: '2025-01-24',
  min: 2,
  max: 7,
  amount: '1',
  unit: 'kg',
  description:
    '설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.',
  current: 4,
  place: '스타벅스 부산대정문점',
  detailPlace: '1층 입구 앞',
  category: '가루류',
  isActivate: false,
}

export const DetailPage = () => {
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
        isActivate={exampleValue.isActivate}
      />
    </Container>
  )
}
