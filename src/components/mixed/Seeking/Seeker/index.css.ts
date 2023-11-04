import { style } from '@vanilla-extract/css'
import { margin } from '../../../../util/constants'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
})

export const images = style({
  display: 'flex',
  borderRadius: margin.siderail,
  overflow: 'hidden',
  aspectRatio: '2 / 1',
})

export const image = style({
  width: '50%',
  height: '100%',
})
