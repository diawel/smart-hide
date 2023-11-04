import { style, styleVariants } from '@vanilla-extract/css'
import { color, fontSize, fontWeight, margin } from '../../../../util/constants'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.siderail,
})

export const upper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: margin.siderail,
})

export const label = style({
  fontSize: fontSize.inFigure,
  fontWeight: fontWeight.bold,
})

export const scoreContainer = style({
  position: 'relative',
  height: 40,
  border: `1px solid ${color.primaryWhite}`,
  borderRadius: margin.siderail,
  overflow: 'hidden',
  boxSizing: 'border-box',
})

export const scoreBar = style({
  position: 'relative',
  backgroundColor: color.primaryWhite,
  borderRadius: margin.siderail,
  width: '100%',
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
      top: '50%',
      left: margin.siderail,
      transform: 'translateY(-50%)',
      fontSize: fontSize.body,
      fontWeight: fontWeight.bold,
    }),
    variant,
  ]
)
