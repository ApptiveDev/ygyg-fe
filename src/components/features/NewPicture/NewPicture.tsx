import { useState } from 'react'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import plusIcon from '@/assets/icons/plus_icon.svg'
import styles from './NewPicture.module.scss'
import Container from '@/components/atoms/Container/Container'
import { FaRegTrashAlt } from 'react-icons/fa'

function NewPicture() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setSelectedImage(null)
  }

  return (
    <Container direction="column" align="center" gap={12}>
      <label className={styles.pictureContainer}>
        {selectedImage ? (
          <div className={styles.imagePreviewContainer}>
            <img src={selectedImage} alt="Uploaded" className={styles.uploadedImage} />
          </div>
        ) : (
          <div className={styles.uploadPlaceholder}>
            <img src={plusIcon} alt="plus" className={styles.icon} />
            <TextBody.Small
              style={{ fontWeight: '700', color: 'var(--gray-color3)' }}
              className={styles.placeholderText}
            >
              이미지를 추가해주세요.
              <br /> (미추가 시 기본 일러스트로 게시글이 업로드됩니다.)
            </TextBody.Small>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.uploadInput}
        />
      </label>
      {selectedImage ? (
        <button onClick={handleRemoveImage} className={styles.removeButton}>
          <FaRegTrashAlt />
          <div>이미지 삭제</div>
        </button>
      ) : null}
    </Container>
  )
}

export default NewPicture
