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

    const convertUnit = (value: number, baseUnit: string, smallUnit: string, largeUnit: string) => {
      if (value >= 1000) {
        return { amount: parseFloat((value / 1000).toFixed(2)), unit: largeUnit }
      }
      return { amount: Math.floor(value), unit: smallUnit }
    }

    if (unit === 'L' || unit === 'ml') {
      const { amount, unit: newUnit } = convertUnit(
        unit === 'L' ? numericAmount * 1000 : numericAmount,
        'ml',
        'ml',
        'L',
      )
      setCalculatedAmount(amount)
      setDisplayUnit(newUnit)
    } else if (unit === 'kg' || unit === 'g') {
      const { amount, unit: newUnit } = convertUnit(
        unit === 'kg' ? numericAmount * 1000 : numericAmount,
        'g',
        'g',
        'kg',
      )
      setCalculatedAmount(amount)
      setDisplayUnit(newUnit)
    } else {
      setCalculatedAmount(numericAmount)
      setDisplayUnit(unit)
    }
  }, [amount, unit, people])

  return { calculatedAmount, displayUnit }
}

export default useSetAmount
