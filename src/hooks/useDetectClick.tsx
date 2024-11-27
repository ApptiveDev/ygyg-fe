import { useEffect, useState } from 'react'

interface Props {
  elem: React.RefObject<HTMLElement>
  initialState?: boolean
}

function useDetectClick({
  elem,
  initialState = false,
}: Props): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isOpen, setIsOpen] = useState(initialState)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (elem.current !== null && !elem.current.contains(e.target as Node)) {
        setIsOpen(false) // 이전 상태를 참조하지 않고 false로 설정
      }
    }

    if (isOpen) {
      window.addEventListener('click', onClick)
    }

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [isOpen, elem])

  return [isOpen, setIsOpen]
}

export default useDetectClick
