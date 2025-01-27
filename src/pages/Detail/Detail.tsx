import Container from '@/components/atoms/Container/Container'
import { MainSection } from './MainSection'
import sampleImg from '@/assets/images/sample_image.png'
import InformationSection from './InformationSection'
import MapSection from './MapSection'
import CommentSection from './CommentSection'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostData } from '@/api/hooks/post/postApi'
import { PostResponseData } from '@/api/hooks/post/types'

export const DetailPage = () => {
  const { userPostId } = useParams<{ userPostId: string }>()
  const [postDetail, setPostDetail] = useState<PostResponseData>()
  const commentSectionRef = useRef<HTMLDivElement>(null)
  const userUuid = localStorage.getItem('userUuid')
  const [isMyPosting, setIsMyPosting] = useState(false)

  useEffect(() => {
    if (userPostId) {
      const fetchDetailData = async () => {
        try {
          const data = await getPostData(Number(userPostId))
          setPostDetail(data)
        } catch (error) {
          console.error('Failed to fetch:', error)
        }
      }
      fetchDetailData()
    }
  }, [userPostId])

  useEffect(() => {
    if (postDetail) {
      setIsMyPosting(postDetail.userPostDataOutDto.writerUuid === userUuid)
      console.log(postDetail)
    }
  }, [postDetail, userUuid])

  const handleActivate = () => {
    const confirmParticipation = window.confirm(
      '정말 소분에 참여하시겠습니까? 참여 시 철회할 수 없습니다.',
    )
    if (confirmParticipation) {
      window.location.reload()
    }
  }

  const scrollToCommentSection = () => {
    if (commentSectionRef.current) {
      const headerHeight = 140
      const elementTop = commentSectionRef.current.getBoundingClientRect().top
      const offsetPosition = elementTop + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Container size="full-width" align="center" direction="column" style={{ marginTop: '60px' }}>
      {postDetail ? (
        <>
          <MainSection
            imageUrl={postDetail.imageUrl}
            title={postDetail.userPostDataOutDto.postTitle}
            writerNickname={'정윤구스'}
            link={postDetail.postDataOutDto.onlinePurchaseUrl}
            price={String(postDetail.postDataOutDto.originalPrice)}
            amount={String(postDetail.postDataOutDto.amount)}
            unit={postDetail.unitName}
            description={postDetail.postDataOutDto.description}
            isActivate={postDetail.userParticipatingIn}
            isMyPosting={isMyPosting}
            onGoToCommentSection={scrollToCommentSection}
          />
          <InformationSection
            min={postDetail.postDataOutDto.minEngageCount}
            max={postDetail.postDataOutDto.maxEngageCount}
            current={postDetail.postDataOutDto.currentEngageCount}
            price={String(postDetail.postDataOutDto.originalPrice)}
            amount={String(postDetail.postDataOutDto.amount)}
            unit={postDetail.unitName}
          />
          <MapSection
            place={postDetail.postDataOutDto.portioningPlaceAddress}
            detailPlace={postDetail.postDataOutDto.portioningPlaceDetailAddress}
            meetAt={postDetail.userPostDataOutDto.portioningDate}
            category={postDetail.categoryName}
            latitude={String(postDetail.postDataOutDto.portioningPlaceLatitude)}
            longitude={String(postDetail.postDataOutDto.portioningPlaceLongitude)}
          />
          <div ref={commentSectionRef} />
          <CommentSection
            userUuid={userUuid!}
            isActivate={postDetail.userParticipatingIn}
            onActivate={handleActivate}
            isMyPosting={isMyPosting}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}
