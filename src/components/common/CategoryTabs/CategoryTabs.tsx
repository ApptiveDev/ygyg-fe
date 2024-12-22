import styles from './CategoryTabs.module.scss'

//img
import liquidIcon from '@/assets/icons/liquid-icon.svg'
import sauceIcon from '@/assets/icons/sauce-icon.svg'
import powderIcon from '@/assets/icons/powder-icon.svg'
import jamIcon from '@/assets/icons/jam-icon.svg'
import etcIcon from '@/assets/icons/etc-icon.svg'
import { Heading } from '@/components/atoms/Text/TextFactory'

const categories = [
  { id: 1, name: '액체류', icon: liquidIcon, link: '' },
  { id: 2, name: '소스류', icon: sauceIcon, link: '' },
  { id: 3, name: '가루류', icon: powderIcon, link: '' },
  { id: 4, name: '잼류', icon: jamIcon, link: '' },
  { id: 5, name: '기타', icon: etcIcon, link: '' },
]

const categoryTabs = () => {
  const handleClick = (link: string) => {
    console.log(`카테고리 링크: ${link}`)
  }

  return (
    <div className={styles['category-container']}>
      <div className={styles['category-title']}>
        <Heading.XXSmall weight={400}>야금야금 양념장</Heading.XXSmall>
        <Heading.XSmall>카테고리 한눈에 보기</Heading.XSmall>
      </div>
      <div className={styles['category-tab']}>
        {categories.map((category) => (
          <div
            className={styles['category-item']}
            key={category.id}
            onClick={() => handleClick(category.link)}
          >
            <img src={category.icon} alt={category.name} className={styles['category-icon']} />
            <span className={styles['category-name']}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default categoryTabs
