import { useState } from 'react'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import plusIcon from '@/assets/icons/plus_icon.svg'
import styles from './NewPicture.module.scss'
import Container from '@/components/atoms/Container/Container'

function NewPicture({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string
  setSelectedImage: (image: string) => void
}) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setSelectedImage(reader.result as string)
          // setImageFile(file);
          resolve()
        }
      })
    }
  }

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setSelectedImage('')
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
          onChange={(e) => handleImageUpload(e)}
          className={styles.uploadInput}
        />
      </label>
      {selectedImage ? (
        <button onClick={handleRemoveImage} className={styles.removeButton}>
          <div>이미지 삭제하기</div>
        </button>
      ) : null}
    </Container>
  )
}

export default NewPicture
