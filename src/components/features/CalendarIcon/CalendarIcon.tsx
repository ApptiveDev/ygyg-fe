import { useEffect, useRef, useState } from 'react'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { Calendar } from '../Calendar/Calendar'
import styles from './Calendar.module.scss'

type CalendarProps = {
  selectedDateInfo: {
    year: number
    month: number
    date: string
  }
  setSelectedDateInfo: React.Dispatch<
    React.SetStateAction<{
      year: number
      month: number
      date: string
    }>
  >
}

export const CalendarIcon: React.FC<
  CalendarProps & { setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>> }
> = ({ selectedDateInfo, setSelectedDateInfo, setErrors }) => {
  const dropDownRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null) // calendarIcon 참조 추가
  const [isOpen, setIsOpen] = useState(false)

  const toggleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node) &&
      iconRef.current &&
      !iconRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  return (
    <div>
      <div ref={iconRef} className={styles.calendarIcon} onClick={toggleCalendar}>
        <MdOutlineCalendarToday className={styles.icon} />
      </div>
      {isOpen && (
        <div
          ref={dropDownRef}
          className={`${styles.dropDownCalendar} ${isOpen ? styles.active : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            selectedDateInfo={selectedDateInfo}
            setSelectedDateInfo={setSelectedDateInfo}
            setErrors={setErrors}
          />
        </div>
      )}
    </div>
  )
}
