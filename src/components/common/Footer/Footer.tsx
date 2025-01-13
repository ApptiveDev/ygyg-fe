import Container from '@/components/atoms/Container/Container'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import logo from '@/assets/images/logo.svg'

interface FooterProps {
  isHome?: boolean
}

export const Footer = ({ isHome }: FooterProps) => {
  return (
    <Container
      size="full-width"
      justify="space-between"
      align="center"
      style={{
        borderTop: '1px solid var(--gray-color2)',
        padding: isHome ? '50px 20px' : '50px 0',
        width: isHome ? '1060px' : '',
        boxSizing: 'border-box',
      }}
    >
      <Container direction="column" gap={12}>
        <TextBody.Small weight={600}>야금야금 (YaGeumYaGeum)</TextBody.Small>
        <TextBody.XSmall>부산광역시 금정구 부산대학로 63번길 2</TextBody.XSmall>
        <Container gap={12}>
          <TextBody.XSmall>E-mail: yageumx2@gmail.com</TextBody.XSmall>
          <TextBody.XSmall>Tel: 051-510-1736</TextBody.XSmall>
        </Container>
        <TextBody.XSmall color="#b0b0b0" style={{ fontSize: '10px' }}>
          야금야금은 소분 거래 중개자로 거래 당사자가 아니므로, 소분 모집자가 등록한 상품 정보 및
          거래 등에 대해 책임을 지지 않습니다. 단, 야금야금이 판매자로 등록 판매한 상품은 판매자로서
          책임을 부담합니다.
        </TextBody.XSmall>
        <Container gap={12}>
          <TextBody.XSmall style={{ cursor: 'pointer' }}>이용약관</TextBody.XSmall>
          <TextBody.XSmall weight={600} style={{ cursor: 'pointer' }}>
            개인정보처리방침
          </TextBody.XSmall>
          <TextBody.XSmall>©Copyright 2024. YaGeumYaGeum. All Rights Reserved.</TextBody.XSmall>
        </Container>
      </Container>
      <img src={logo} alt="logo" height="100px" />
    </Container>
  )
}
