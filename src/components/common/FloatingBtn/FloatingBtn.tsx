import styles from '@/components/common/FloatingBtn/FloatingBtn.module.scss';
import FloatingImage from '@/assets/icons/floating-icon.svg';

const FloatingBtn: React.FC = () => {
  return (
    <button className={styles.floatingBtn}>
      <img src={FloatingImage} alt="Floating Icon" className={styles.floatingIcon} />
      <span className={styles.floatingText}>새 양념장<br/>소분하러 가기</span>
    </button>
  );
};

export default FloatingBtn;