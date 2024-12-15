import { useState, useEffect } from 'react'
import styles from './Calendar.module.scss'

type SelectedDateInfo = {
  year: number
  month: number
  date: string
}

interface CalendarProps {
  selectedDateInfo: SelectedDateInfo
  setSelectedDateInfo: React.Dispatch<React.SetStateAction<SelectedDateInfo>>
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>> // 오류 상태 업데이트를 위한 prop 추가
}

export const Calendar = ({ selectedDateInfo, setSelectedDateInfo, setErrors }: CalendarProps) => {
  const { year, month, date } = selectedDateInfo
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])
  const [startDay, setStartDay] = useState(0)
  const today = new Date()
  const todayDate = today.getDate()
  const todayMonth = today.getMonth() + 1 // 월은 0부터 시작
  const todayYear = today.getFullYear()

  useEffect(() => {
    const days = new Date(year, month, 0).getDate()
    setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1))

    const firstDayOfMonth = new Date(year, month - 1, 1).getDay()
    setStartDay(firstDayOfMonth)
  }, [year, month])

  const dayClick = (day: number) => {
    setSelectedDateInfo({ ...selectedDateInfo, date: day.toString() })
    if (setErrors) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors.selectedDate // 오류 제거
        return newErrors
      })
    }
  }

  const handleMonthChange = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 전파 방지
    if (direction === 'prev') {
      const newMonth = month > 1 ? month - 1 : 12
      const newYear = month > 1 ? year : year - 1
      setSelectedDateInfo({ year: newYear, month: newMonth, date: '' })
    } else {
      const newMonth = month < 12 ? month + 1 : 1
      const newYear = month < 12 ? year : year + 1
      setSelectedDateInfo({ year: newYear, month: newMonth, date: '' })
    }
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.monthWrapper}>
        <button
          className={styles.monthButton}
          onClick={(e) => handleMonthChange('prev', e)} // stopPropagation 추가
        >
          ◀
        </button>
        <div className={styles.title}>{`${year}. ${month.toString().padStart(2, '0')}`}</div>
        <button
          className={styles.monthButton}
          onClick={(e) => handleMonthChange('next', e)} // stopPropagation 추가
        >
          ▶
        </button>
      </div>
      <div className={styles.days}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.daysGrid}>
        {Array(startDay)
          .fill(null)
          .map((_, idx) => (
            <div className={styles.placeholder} key={`empty-${idx}`} />
          ))}
        {daysInMonth.map((day) => {
          const isToday =
            day === todayDate &&
            selectedDateInfo.month === todayMonth &&
            selectedDateInfo.year === todayYear
          return (
            <div
              key={day}
              className={`${styles.date} ${
                date === day.toString() ? styles.selectedDate : ''
              } ${isToday ? styles.today : ''}`}
              onClick={() => dayClick(day)}
            >
              {day}
            </div>
          )
        })}
      </div>
      <div className={styles.todayWrapper}>
        <div className={styles.square} />
        &nbsp;: today
      </div>
    </div>
  )
}
