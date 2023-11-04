import { style } from '@vanilla-extract/css'
import { color, fontSize, fontWeight } from '../../../../util/constants'

export const container = style({
  position: 'relative',
  fontSize: fontSize.typography,
  fontWeight: fontWeight.bold,
})

export const stroke = style({
  WebkitTextStroke: `1px ${color.primaryWhite}`,
  color: 'transparent',
})

export const fill = style({
  position: 'absolute',
  top: 0,
  color: color.primaryBlack,
})
