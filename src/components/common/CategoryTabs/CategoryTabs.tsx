import React, { useState } from 'react';
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

const CategoryTabs = ({
  showText = true,
  onCategorySelect,
}: {
  showText?: boolean;
  onCategorySelect: (category: string) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleClick = (categoryName: string) => {
    console.log(`카테고리 선택됨: ${categoryName}`);
    setSelectedCategory(categoryName);
    onCategorySelect(categoryName);
  };

  return (
    <div className={styles['category-container']}>
      {showText && (
        <div className={styles['category-title']}>
          <Heading.XXSmall weight={400}>야금야금 양념장</Heading.XXSmall>
          <Heading.XSmall>카테고리 한눈에 보기</Heading.XSmall>
        </div>
      )}
      <div className={styles['category-tab']}>
        {categories.map((category) => (
          <div
          className={`${styles['category-item']} ${
            selectedCategory === category.name ? styles['active'] : ''
          }`}
            key={category.id}
            onClick={() => handleClick(category.name)}
          >
          <img
              src={category.icon}
              alt={category.name}
              className={styles['category-icon']}
              style={{
                display: selectedCategory === category.name ? 'none' : 'block', // 클릭 시 이미지 숨김
              }}
            />
            <span className={styles['category-name']}>{category.name}</span> {/* 항상 텍스트 표시 */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryTabs;
