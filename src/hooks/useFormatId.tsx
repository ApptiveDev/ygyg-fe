export function useFormatUnitToId(unit: string) {
  const unitMap: Record<string, number> = {
    g: 1,
    kg: 2,
    ml: 3,
    L: 4,
  }

  return unitMap[unit] || 1
}
export function useFormatIdToUnit(id: number): string {
  const unitMap: Record<number, string> = {
    1: 'g',
    2: 'kg',
    3: 'ml',
    4: 'L',
  }

  return unitMap[id] || ''
}

export function useFormatSeasoningCategoryId(category: string): number {
  const categoryMap: Record<string, number> = {
    기타: 1,
    액체류: 2,
    소스류: 3,
    가루류: 4,
    잼류: 5,
  }

  return categoryMap[category] || 1
}

export function useFormatSeasoningIdToCategory(id: number): string {
  const categoryMap: Record<number, string> = {
    1: '기타',
    2: '액체류',
    3: '소스류',
    4: '가루류',
    5: '잼류',
  }
  return categoryMap[id] || ''
}
