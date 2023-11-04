import { style } from '@vanilla-extract/css'
import { fontSize, margin } from '../../../util/constants'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.paragraph,
  width: '100%',
})

export const label = style({
  fontSize: fontSize.label,
})
