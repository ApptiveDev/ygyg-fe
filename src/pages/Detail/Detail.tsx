import Container from '@/components/atoms/Container/Container'
import { MainSection } from './MainSection'
import sampleImg from '@/assets/images/sample_image.png'
import InformationSection from './InformationSection'
import MapSection from './MapSection'
import useFormatTime from '@/hooks/useFormatTime'
import CommentSection from './CommentSection'

const exampleValue = {
  thumbnail: sampleImg,
  title: '게시글 제목',
  author: '작성자',
  link: 'http://localhost:5173/detail',
  price: '20000',
  year: '2025',
  month: '01',
  date: '24',
  hour: '18',
  minute: '30',
  min: 4,
  max: 7,
  amount: '1',
  unit: 'kg',
  description:
    '설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.설명이 들어가는 칸입니다.',
  current: 6,
  place: '스타벅스 부산대정문점',
  detailPlace: '1층 입구 앞',
  latitude: '35.2314079',
  longitude: '129.0843855',
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
        year={exampleValue.year}
        month={exampleValue.month}
        date={exampleValue.date}
        hour={useFormatTime(Number(exampleValue.hour))}
        minute={exampleValue.minute}
        category={exampleValue.category}
        latitude={exampleValue.latitude}
        longitude={exampleValue.longitude}
      />
      <CommentSection isActivate={exampleValue.isActivate} />
    </Container>
  )
}
