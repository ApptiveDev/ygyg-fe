import styles from './Home.module.scss';
import { Heading} from '@/components/atoms/Text/TextFactory'
import SearchBar from '@/components/common/SearchBar/SearchBar';
import CategoryTab from '@/components/common/CategoryTabs/CategoryTabs';
import CardList from '@/components/common/CardList/CardList/CardList'

export const HomePage = () => {
  return (
    <div className = {styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.wrapper}>
        <div className={styles['searchbar-container']}>
          <SearchBar />
        </div>
        <div className={styles['categorytabs-container']}>
          <CategoryTab />
        </div>
      </div>
      <div className={styles['grey-line']}></div>
      <div className = {styles['list-container']}>
        <Heading.Large>양념장 소분 게시글 목록</Heading.Large>
        <CardList/>
        <button className = {styles['full-list-button']}>소분 게시물 전체 보기</button>
      </div>
    </div>
  );
};
