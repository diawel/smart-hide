import { style } from '@vanilla-extract/css'
import { margin } from '../../../util/constants'

export const qrcodeWrapper = style({
  width: '100%',
  aspectRatio: '1',
  border: '1px solid #000000',
})

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
})
