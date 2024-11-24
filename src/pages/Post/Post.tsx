import { Heading } from '@/components/atoms/Text/TextFactory'
import styles from './Post.module.scss'
import { Header } from '@/components/common/Header/Header'
import Container from '@/components/atoms/Container/Container'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes'
import Category from '@/components/common/Category/Category'
import InputText from '@/components/atoms/InputText/InputText'

export const PostPage = () => {
  return (
    <div>
      <Header />
      <Container
        size="full-width"
        maxWidth={MAX_CONTENT_WIDTH}
        direction="column"
        style={{ padding: '120px 15% 0 15%', boxSizing: 'border-box' }}
      >
        <Heading.Medium className={styles.mainTitle}>양념장 소분 게시글 작성하기</Heading.Medium>
        <Container direction="column" style={{ gap: '36px', marginBottom: '46px' }}>
          <Heading.XSmall>소분하고자 하는 양념의 카테고리를 선택해주세요.</Heading.XSmall>
          <Category text={['액체류', '소스류', '가루류', '잼류', '기타']} />
        </Container>
        <Container direction="column" style={{ gap: '16px', marginBottom: '46px' }}>
          <Heading.XSmall>게시글 제목</Heading.XSmall>
          <InputText placeholder="제목을 입력해주세요." width="800px" />
        </Container>
        {/* <Heading.XSmall>양념장 이미지</Heading.XSmall> */}
        <Container direction="column" style={{ gap: '16px', marginBottom: '46px' }}>
          <Heading.XSmall>온라인 구매의 경우 제품 링크(선택)</Heading.XSmall>
          <InputText placeholder="링크를 입력해주세요." width="800px" />
        </Container>
        <Container direction="column" style={{ gap: '16px', marginBottom: '46px' }}>
          <Heading.XSmall>함께 구매하고자 하는 양념장의 가격(원 단위)</Heading.XSmall>
          <InputText placeholder="양념장 총액을 입력해주세요." width="800px" />
        </Container>
        <Container direction="column" style={{ gap: '16px', marginBottom: '46px' }}>
          <Heading.XSmall>원하는 소분 인원</Heading.XSmall>
          <Container style={{ gap: '20px' }}>
            <InputText placeholder="숫자를 선택하면 최소 인원이 나타나요." width="360px" />
            <InputText placeholder="숫자를 선택하면 최대 인원이 나타나요." width="360px" />
          </Container>
        </Container>
        <Container direction="column" style={{ gap: '16px', marginBottom: '46px' }}>
          <Heading.XSmall>최대 인원으로 소분했을 때의 예상 가격</Heading.XSmall>
          <InputText placeholder="인원을 입력하면 예상 가격이 나타나요." width="800px" />
        </Container>
        {/* <Heading.XSmall>소분을 원하는 날짜와 시간</Heading.XSmall> */}
        <Container direction="column" style={{ gap: '16px', marginBottom: '46px' }}>
          <Heading.XSmall>게시글 내용(소분 상세 설명)</Heading.XSmall>
          <InputText placeholder="내용을 입력해주세요" width="800px" />
        </Container>
        {/* <Heading.XSmall>소분 희망 장소(아래 지도에서 선택해주세요.)</Heading.XSmall> */}
      </Container>
    </div>
  )
}
