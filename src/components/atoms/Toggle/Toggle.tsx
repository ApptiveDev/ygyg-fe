import styles from '@/components/atoms/Toggle/Toggle.module.scss'
import React from 'react';

interface ToggleProps {
  isChecked: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isChecked, onToggle }) => {
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className={styles.toggleInput}
        />
        <span className={styles.toggleSlider}></span>
      </label>
      <div className={styles.toggleLabel}>최소인원 달성한 글만</div>
    </div>
  );
};

export default Toggle;
