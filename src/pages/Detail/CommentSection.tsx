import Container from '@/components/atoms/Container/Container'
import InputText from '@/components/atoms/InputText/InputText'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import Button from '@/components/common/Button/Button'

interface CommentProps {
  isActivate: boolean
}

function CommentSection({ isActivate }: CommentProps) {
  return (
    <Container
      size="full-width"
      align="center"
      direction="column"
      gap={45}
      style={{
        borderBottom: '1px solid var(--gray-color2)',
        boxSizing: 'border-box',
        paddingBottom: '50px',
      }}
    >
      {isActivate ? (
        <Container>
          <InputText />
        </Container>
      ) : (
        <Container size="full-width" direction="column" align="center" gap={10}>
          <Button theme="red" width="50%" style={{ borderRadius: '12px' }}>
            소분 참여하기
          </Button>
          <TextBody.XSmall weight={500} color="var(--point-color)" style={{ fontSize: '12px' }}>
            소분 일시를 잘 확인하고 신중히 참여해주세요.
          </TextBody.XSmall>
        </Container>
      )}
    </Container>
  )
}

export default CommentSection
