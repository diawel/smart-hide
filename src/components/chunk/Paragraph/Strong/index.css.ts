import { style } from '@vanilla-extract/css'
import { color, fontSize, fontWeight } from '../../../../util/constants'

export const container = style({
  position: 'relative',
  fontSize: fontSize.typography,
  fontWeight: fontWeight.bold,
  WebkitTextStroke: `1px ${color.primaryWhite}`,
  color: 'transparent',
})
