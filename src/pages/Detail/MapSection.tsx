import Container from '@/components/atoms/Container/Container'
import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import { Map } from '@/components/features/Map/Map'

interface MapProps {
  place: string
  detailPlace: string
  year: string
  month: string
  date: string
  hour: string
  minute: string
  category: string
  latitude: string
  longitude: string
}

function MapSection({
  place,
  detailPlace,
  year,
  month,
  date,
  hour,
  minute,
  category,
  latitude,
  longitude,
}: MapProps) {
  return (
    <Container size="full-width" direction="column" align="center" style={{ marginBottom: '50px' }}>
      <Container size="full-width" style={{ margin: '24px 0' }}>
        <Container
          direction="column"
          align="center"
          justify="center"
          style={{ height: '190px', flexGrow: '3' }}
        >
          <Container direction="column" align="flex-start" gap={25}>
            <Heading.XSmall>소분 희망 장소</Heading.XSmall>
            <TextBody.Medium
              weight={500}
              color="var(--gray-color5)"
              style={{ lineHeight: '1.3rem' }}
            >
              {place}
              <br />
              {detailPlace}
            </TextBody.Medium>
          </Container>
        </Container>
        <Container
          direction="column"
          align="center"
          justify="center"
          style={{
            height: '190px',
            flexGrow: '4',
            borderLeft: '1px solid var(--gray-color2)',
            borderRight: '1px solid var(--gray-color2)',
          }}
        >
          <Container direction="column" align="flex-start" gap={25}>
            <Heading.XSmall>소분 일시</Heading.XSmall>
            <TextBody.Medium
              weight={500}
              color="var(--gray-color5)"
              style={{ lineHeight: '1.3rem' }}
            >
              {year}년 {month}월 {date}일 {hour}시 {minute}분
            </TextBody.Medium>
          </Container>
        </Container>
        <Container
          direction="column"
          align="center"
          justify="center"
          style={{ height: '190px', flexGrow: '3' }}
        >
          <Container direction="column" align="flex-start" gap={25}>
            <Heading.XSmall>카테고리</Heading.XSmall>
            <TextBody.Medium
              weight={500}
              color="var(--gray-color5)"
              style={{ lineHeight: '1.3rem' }}
            >
              {category}
            </TextBody.Medium>
          </Container>
        </Container>
      </Container>
      <Map latitude={latitude} longitude={longitude} />
    </Container>
  )
}

export default MapSection
