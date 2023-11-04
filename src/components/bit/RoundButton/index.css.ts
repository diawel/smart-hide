import { style } from '@vanilla-extract/css'
import { color, fontSize, margin } from '../../../util/constants'

export const container = style({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${color.primaryWhite}`,
  height: margin.siderail * 2,
  padding: `0 ${margin.siderail}px`,
  borderRadius: margin.siderail,
  boxSizing: 'border-box',
  fontSize: fontSize.ui,
  width: 'fit-content',
})
