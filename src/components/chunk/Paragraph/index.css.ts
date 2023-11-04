import { style } from '@vanilla-extract/css'
import { margin } from '../../../util/constants'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.paragraph,
})
