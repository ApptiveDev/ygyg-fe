import Container from '@/components/atoms/Container/Container'
import { Heading, TextBody } from '@/components/atoms/Text/TextFactory'
import { Map } from '@/components/features/Map/Map'
import { DateForUse, DateFromData, TimeForUse, TimeFromData } from '@/hooks/useFormatDateAndTime'

interface MapProps {
  place: string
  detailPlace: string
  meetAt: string
  category: string
  latitude: string
  longitude: string
}

function MapSection({ place, detailPlace, meetAt, category, latitude, longitude }: MapProps) {
  const meetingDate = DateFromData(meetAt)
  const meetingTime = TimeFromData(meetAt)
  const year = DateForUse(meetingDate)[0]
  const month = DateForUse(meetingDate)[1]
  const date = DateForUse(meetingDate)[2]
  const hour = TimeForUse(meetingTime)[0]
  const minute = TimeForUse(meetingTime)[1]

  return (
    <Container size="full-width" direction="column" align="center" style={{ marginBottom: '50px' }}>
      <Container size="full-width" style={{ margin: '24px 0' }}>
        <Container
          direction="column"
          align="center"
          justify="center"
          style={{ height: '190px', flexGrow: '3' }}
        >
          <Container direction="column" align="center" gap={25}>
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
          style={{
            height: '190px',
            flexGrow: '4',
            borderLeft: '1px solid var(--gray-color2)',
            borderRight: '1px solid var(--gray-color2)',
          }}
        >
          <Container direction="column" align="center" gap={25}>
            <Heading.XSmall>소분 희망 장소</Heading.XSmall>
            <Container direction="column" align="center">
              <TextBody.Medium
                weight={500}
                color="var(--gray-color5)"
                style={{ lineHeight: '1.3rem' }}
              >
                {place} {detailPlace}
              </TextBody.Medium>
            </Container>
          </Container>
        </Container>
        <Container
          direction="column"
          align="center"
          justify="center"
          style={{ height: '190px', flexGrow: '3' }}
        >
          <Container direction="column" align="center" gap={25}>
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
