import { keyframes, style } from '@vanilla-extract/css'
import { margin } from '../../../util/constants'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
})

const slideInRight = keyframes({
  from: {
    transform: 'translateX(10%)',
    opacity: 0,
  },
  to: {
    transform: 'translateX(0)',
    opacity: 1,
  },
})

export const playerWrapper = style({
  animation: `${slideInRight} 0.6s ease backwards`,
})
