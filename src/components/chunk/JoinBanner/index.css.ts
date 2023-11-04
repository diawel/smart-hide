import { style } from '@vanilla-extract/css'
import { fontSize, margin } from '../../../util/constants'

export const container = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  gap: margin.siderail,
})

export const descriptionColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.siderail,
  justifyContent: 'space-between',
  height: 132,
  overflow: 'hidden',
})

export const description = style({
  fontSize: fontSize.ui,
})

export const qrWrapper = style({
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  width: 132,
  height: 132,
  flexShrink: 0,
  overflow: 'hidden',
})

export const barcode = style({
  width: '100%',
  height: 132,
})
