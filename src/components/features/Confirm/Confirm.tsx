import styles from './Confirm.module.scss'

interface CustomConfirmProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

function Confirm({ message, onConfirm, onCancel }: CustomConfirmProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  )
}

export default Confirm
