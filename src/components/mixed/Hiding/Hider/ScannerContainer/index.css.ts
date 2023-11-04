import { style, styleVariants } from '@vanilla-extract/css'
import { color, margin } from '../../../../../util/constants'

export const container = style({
  width: '100%',
  aspectRatio: '1',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: margin.siderail,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const progressBar = styleVariants(
  {
    top: {
      transform: 'rotate(0deg)',
    },
    right: {
      transform: 'rotate(90deg)',
    },
    bottom: {
      transform: 'rotate(180deg)',
    },
    left: {
      transform: 'rotate(270deg)',
    },
  },
  (side) => [
    style({
      position: 'absolute',
      width: `calc(100% - ${margin.siderail / 2}px)`,
      height: '50%',
      top: 0,
      right: margin.siderail / 4,
      transformOrigin: '50% 100%',
    }),
    side,
  ]
)

export const progress = style({
  height: margin.siderail / 2,
  backgroundColor: color.primaryWhite,
  marginLeft: 'auto',
})

export const scannerWrapper = style({
  position: 'relative',
  width: `calc(100% - 2px)`,
  aspectRatio: '1',
  borderRadius: margin.siderail,
  backgroundColor: color.primaryBlack,
  overflow: 'hidden',
})
