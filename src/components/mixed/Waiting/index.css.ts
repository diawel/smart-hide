import { style } from '@vanilla-extract/css'
import { fontSize, margin } from '../../../util/constants'

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
