import { useRef, useState } from 'react'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import plusIcon from '@/assets/icons/plus_icon.svg'
import styles from './NewPicture.module.scss'
import Container from '@/components/atoms/Container/Container'
import { deleteImage, getPresignedUrl } from '@/api/hooks/post/imageApi'
import axios from 'axios'
import { useFormatPreSignedUrl } from '@/hooks/useFormatPreSignedUrl'

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/svg+xml',
]

function NewPicture({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string
  setSelectedImage: (image: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const userEmail = localStorage.getItem('userEmail')
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const contentType = file.type

    if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
      alert('지원되지 않는 이미지 형식입니다.')
      return
    }

    setUploading(true)
    setFileName(file.name)

    try {
      const preSignedUrl = await getPresignedUrl(file.name, contentType)
      await axios.put(preSignedUrl, file, {
        headers: { 'Content-Type': contentType },
      })
      const fileUrl = useFormatPreSignedUrl(preSignedUrl)
      setSelectedImage(fileUrl)
    } catch (error) {
      console.error('Image upload failed:', error)
    }
  }

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (selectedImage) {
      setUploading(false)
      deleteImage(`${userEmail}-${fileName}`)
      setSelectedImage('')
      setFileName('')

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
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
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(',')}
          onChange={handleImageUpload}
          className={styles.uploadInput}
          disabled={uploading}
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
