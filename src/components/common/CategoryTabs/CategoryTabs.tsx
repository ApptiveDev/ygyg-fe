import React, { useEffect, useState } from 'react';
import styles from './CategoryTabs.module.scss';

import liquidIcon from '@/assets/icons/liquid-icon.svg';
import sauceIcon from '@/assets/icons/sauce-icon.svg';
import powderIcon from '@/assets/icons/powder-icon.svg';
import jamIcon from '@/assets/icons/jam-icon.svg';
import etcIcon from '@/assets/icons/etc-icon.svg';
import { Heading } from '@/components/atoms/Text/TextFactory';

const categoryLabelMap: Record<string, string> = {
  liquid: '액체류',
  sauce: '소스류',
  powder: '가루류',
  jam: '잼류',
  etc: '기타',
};

const categories = [
  { id: 1, name: 'liquid', icon: liquidIcon, link: '' },
  { id: 2, name: 'sauce', icon: sauceIcon, link: '' },
  { id: 3, name: 'powder', icon: powderIcon, link: '' },
  { id: 4, name: 'jam', icon: jamIcon, link: '' },
  { id: 5, name: 'etc', icon: etcIcon, link: '' },
];

const CategoryTabs = ({
  showText = true,
  initialSelected,
  onCategorySelect,
}: {
  showText?: boolean;
  initialSelected?: string;
  onCategorySelect: (category: string) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (initialSelected) {
      setSelectedCategory(initialSelected);
    }
  }, [initialSelected]);

  const handleClick = (categoryName: string) => {
    console.log(`카테고리 선택됨: ${categoryName}`);
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      onCategorySelect('');
    } else {
      setSelectedCategory(categoryName);
      onCategorySelect(categoryName);
    }
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
                display: selectedCategory === category.name ? 'none' : 'block',
              }}
            />
            <span className={styles['category-name']}>{categoryLabelMap[category.name]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
