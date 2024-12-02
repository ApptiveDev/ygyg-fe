import { TextBody } from '@/components/atoms/Text/TextFactory'
import plusIcon from '@/assets/icons/plus_icon.svg'
import styles from './NewPicture.module.scss'

function NewPicture() {
  return (
    <div className={styles.pictureContainer}>
      <img src={plusIcon} alt="plus" />
      <TextBody.Small style={{ fontWeight: '700', color: 'var(--gray-color3)' }}>
        이미지를 추가해주세요.
        <br /> (미추가 시 기본 일러스트로 게시글이 업로드됩니다.)
      </TextBody.Small>
    </div>
  )
}

export default NewPicture
