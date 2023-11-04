import { style } from '@vanilla-extract/css'
import { color, fontSize, margin } from '../../../util/constants'

export const container = style({
  position: 'relative',
  height: 120,
  border: `1px solid ${color.primaryWhite}`,
  borderRadius: margin.siderail,
  overflow: 'hidden',
})

export const progress = style({
  backgroundColor: color.primaryWhite,
})

export const text = style({
  position: 'absolute',
  bottom: margin.paragraph,
  right: margin.paragraph,
  color: color.primaryWhite,
  fontSize: fontSize.inFigure,
  mixBlendMode: 'difference',
})
