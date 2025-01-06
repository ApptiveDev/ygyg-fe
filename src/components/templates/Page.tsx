import { ReactNode } from 'react'
import { Header } from '../common/Header/Header'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { Footer } from '../common/Footer/Footer'
import FloatingButton from '../common/FloatingButton/FloatingButton'

interface PageProps {
  home?: boolean
  floatingButton?: boolean
}

function Page({ home = false, floatingButton = true }: PageProps) {
  return (
    <PageWrapper>
      {home ? <Header isHome={true} /> : <Header />}
      <InnerWrapper>
        <Outlet />
        {floatingButton ? <FloatingButton /> : null}
        <Footer />
      </InnerWrapper>
    </PageWrapper>
  )
}

export default Page

const PageWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`
const HomeInnerWrapper = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
`

const InnerWrapper = styled.div`
  margin-top: 120px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  height: 100%;
  width: 1060px;
  box-sizing: border-box;
`
