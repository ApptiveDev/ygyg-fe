import { ReactNode } from 'react'
import { Header } from '../common/Header/Header'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
interface PageProps {
  // children?: ReactNode
  home?: boolean
}

function Page({ home = false }: PageProps) {
  return (
    <PageWrapper>
      {home ? <Header isHome={true} /> : <Header />}
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>

      {/* <Footer /> */}
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

const InnerWrapper = styled.div`
  margin-top: 120px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 1060px;
  box-sizing: border-box;
`
