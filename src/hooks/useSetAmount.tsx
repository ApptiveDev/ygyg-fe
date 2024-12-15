import { useState, useEffect } from 'react'

interface AmountProps {
  amount: string
  unit: string
  people: number | null
}

interface SetAmountResult {
  calculatedAmount: number
  displayUnit: string
}

function useSetAmount({ amount, unit, people }: AmountProps): SetAmountResult {
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0)
  const [displayUnit, setDisplayUnit] = useState<string>(unit)

  useEffect(() => {
    if (!amount.trim() || isNaN(Number(amount)) || !people || people <= 0) {
      setCalculatedAmount(0)
      setDisplayUnit(unit)
      return
    }

    let numericAmount = Number(amount) / people

    if (unit === 'L' || unit === 'ml') {
      if (unit === 'L') {
        numericAmount = numericAmount * 1000
        if (numericAmount >= 1000) {
          setCalculatedAmount(Number((numericAmount / 1000).toFixed(2)))
          setDisplayUnit('L')
        } else {
          setCalculatedAmount(Math.floor(numericAmount))
          setDisplayUnit('ml')
        }
      } else {
        if (numericAmount >= 1000) {
          setCalculatedAmount(Number((numericAmount / 1000).toFixed(2)))
          setDisplayUnit('L')
        } else {
          setCalculatedAmount(Math.floor(numericAmount))
          setDisplayUnit('ml')
        }
      }
    } else if (unit === 'kg' || unit === 'g') {
      if (unit === 'kg') {
        numericAmount = numericAmount * 1000
        if (numericAmount >= 1000) {
          setCalculatedAmount(Number((numericAmount / 1000).toFixed(2)))
          setDisplayUnit('kg')
        } else {
          setCalculatedAmount(Math.floor(numericAmount))
          setDisplayUnit('g')
        }
      } else {
        if (numericAmount >= 1000) {
          setCalculatedAmount(Number((numericAmount / 1000).toFixed(2)))
          setDisplayUnit('kg')
        } else {
          setCalculatedAmount(Math.floor(numericAmount))
          setDisplayUnit('g')
        }
      }
    } else {
      setCalculatedAmount(numericAmount)
      setDisplayUnit(unit)
    }
  }, [amount, unit, people])

  return { calculatedAmount, displayUnit }
}

export default useSetAmount
