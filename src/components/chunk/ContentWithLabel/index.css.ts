import { style } from '@vanilla-extract/css'
import { fontSize, margin } from '../../../util/constants'
import { fadeIn } from '../../../util/commonKeyframes.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.paragraph,
  width: '100%',
})

export const label = style({
  fontSize: fontSize.label,
  animation: `${fadeIn} 0.6s ease`,
})
