import { ReactNode } from 'react'
import { Header } from '../common/Header/Header'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
interface PageProps {
  // children?: ReactNode
  hideHeader?: boolean
}

function Page({ hideHeader = false }: PageProps) {
  return (
    <PageWrapper>
      {hideHeader ? null : <Header />}
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
  width: 100vw;
  box-sizing: border-box;
`

const InnerWrapper = styled.div`
  margin-top: 120px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100%;
  width: 1050px;
  box-sizing: border-box;
`
