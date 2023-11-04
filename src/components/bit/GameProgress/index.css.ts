import { style, styleVariants } from '@vanilla-extract/css'
import { color, fontSize, fontWeight, margin } from '../../../util/constants'

export const container = style({
  position: 'relative',
  height: 120,
  border: `1px solid ${color.primaryWhite}`,
  borderRadius: margin.siderail,
  overflow: 'hidden',
})

export const progress = style({
  position: 'relative',
  backgroundColor: color.primaryWhite,
  height: '100%',
})

export const text = styleVariants(
  {
    overay: {
      color: color.primaryWhite,
      mixBlendMode: 'difference',
    },
    background: {
      color: color.primaryBlack,
    },
  },
  (variant) => [
    style({
      position: 'absolute',
      bottom: margin.paragraph,
      right: margin.paragraph,
      fontSize: fontSize.inFigure,
      fontWeight: fontWeight.bold,
    }),
    variant,
  ]
)
