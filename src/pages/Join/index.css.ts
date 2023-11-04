import { style } from '@vanilla-extract/css'
import { margin } from '../../util/constants'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
})

export const qrReaderWrapper = style({
  aspectRatio: '1',
  width: '100%',
  overflow: 'hidden',
})
