import React from 'react';
import styles from './ListPageDropdown.module.scss';

interface ListPageDropdownProps {
  isOpen: boolean;
  selected: string;
  options: string[];
  toggleDropdown: () => void;
  handleOptionClick: (option: string) => void;
}

const ListPageDropdown: React.FC<ListPageDropdownProps> = ({ isOpen, selected, options, toggleDropdown, handleOptionClick }) => {
  return (
    <div className={styles.dropdownContainer}>
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`} onClick={toggleDropdown}>
        <div className={`${styles.selectedOption} ${selected ? styles.active : ''}`}>
          {selected}
          <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${selected === option ? styles.selected : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPageDropdown;
