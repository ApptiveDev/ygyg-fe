import { css, keyframes, SerializedStyles } from '@emotion/react'
import { breakPoints } from '@/styles/breakpoints'
import { ResponsiveColumns, ResponsiveCSSObjects, ScreenSize } from '@/types/styles'

export function getLandingKeyframesArray(reverse: boolean = false, fromY: string = '20px') {
  return [
    {
      transform: `translateY(${reverse ? `-${fromY}` : fromY})`,
      opacity: 0,
    },
    {
      transform: 'translateY(0)',
      opacity: 1,
    },
  ]
}

export function getLandingKeyframes(reverse: boolean = false, fromY: string = '20px') {
  return keyframes`
    from {
      transform: translateY(${reverse ? `-${fromY}` : fromY});
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `
}

export function serializeResponsiveCss(sizes?: ResponsiveCSSObjects): SerializedStyles {
  if (!sizes) {
    return css``
  }

  const ret: SerializedStyles[] = []
  Object.entries(sizes).forEach(([sizeKey, cssObject]) => {
    const key = sizeKey as ScreenSize
    const style = css`
      @media (min-width: ${breakPoints[key]}) {
        ${css(cssObject)}
      }
    `
    ret.push(style)
  })

  return css(ret)
}

export function serializeResponsiveColumns(
  responsiveColumns?: ResponsiveColumns,
): SerializedStyles {
  if (!responsiveColumns) {
    return css``
  }

  const ret: SerializedStyles[] = []
  Object.entries(responsiveColumns).forEach(([sizeKey, columns]) => {
    const key = sizeKey as ScreenSize
    const colCss = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns
    const style = css`
      @media (min-width: ${breakPoints[key]}) {
        grid-template-columns: ${colCss};
      }
    `
    ret.push(style)
  })

  return css(ret)
}
