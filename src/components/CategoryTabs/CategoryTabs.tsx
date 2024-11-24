import './CategoryTabs.css'

//img
import liquidIcon from '../../assets/icons/liquid-icon.png';
import sauceIcon from '../../assets/icons/sauce-icon.png';
import powderIcon from '../../assets/icons/powder-icon.png';
import jamIcon from '../../assets/icons/jam-icon.png';
import etcIcon from '../../assets/icons/etc-icon.png';


const categories = [
  { id: 1, name: '액체류', icon: liquidIcon, link: '' },
  { id: 2, name: '소스류', icon: sauceIcon, link: '' },
  { id: 3, name: '가루류', icon: powderIcon, link: '' },
  { id: 4, name: '잼류', icon: jamIcon, link: '' },
  { id: 5, name: '기타', icon: etcIcon, link: '' },
];

const categoryTabs = () => {
  const handleClick = (link: string) => {
    console.log(`카테고리 링크: ${link}`);
  };

  return (
    <div className='category-container'>
      <div className = 'category-title'>
        <span>야금야금 양념장</span>
        <span>카테고리 한눈에 보기</span>
      </div>
      {/*카테고리 목록*/}
      <div className = 'category-tab'>
      {categories.map((category) => (
        <div className = 'category-item' key = {category.id} onClick = {() => handleClick(category.link)}>
          <img src = {category.icon} alt = {category.name} className = 'category-icon'></img>
          <span className = 'category-name'>{category.name}</span>
      </div>
      ))}
      </div>
    </div>
  );
};

export default categoryTabs;