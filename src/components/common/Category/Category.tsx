import { useState } from 'react'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import styles from './Category.module.scss'

interface CategoryProps {
  icons?: string[]
  text?: string[]
}

function Category({ icons, text }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categoryClick = (label: string) => {
    setSelectedCategory((prev) => (prev === label ? null : label)) // 선택/해제 토글
  }

  return (
    <div className={styles.categoryWrapper}>
      {icons &&
        icons.map((icon, index) => (
          <button
            key={`icon-${index}`}
            className={`${styles.category} ${selectedCategory === icon ? styles.selected : ''}`}
            onClick={() => categoryClick(icon)}
          >
            {icon}
          </button>
        ))}
      {text &&
        text.map((label, index) => (
          <button
            key={`text-${index}`}
            className={`${styles.category} ${selectedCategory === label ? styles.selected : ''}`}
            onClick={() => categoryClick(label)}
          >
            <TextBody.Small style={{ fontWeight: '600' }}>{label}</TextBody.Small>
          </button>
        ))}
    </div>
  )
}

export default Category
