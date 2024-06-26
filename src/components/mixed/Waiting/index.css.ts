import { style } from '@vanilla-extract/css'
import { fontSize, margin } from '../../../util/constants'
import { slideIn } from '../../../util/commonKeyframes.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
})

export const playerList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.paragraph,
  fontSize: fontSize.body,
})

export const player = style({
  animation: `${slideIn} 0.6s ease backwards`,
})
