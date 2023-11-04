import { style } from '@vanilla-extract/css'
import { color } from '../../../util/constants'

export const input = style({
  margin: 0,
  padding: 0,
  borderRadius: 0,
  outline: 'none',
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderColor: color.primaryWhite,
  borderWidth: '0 0 1px',
  height: '32px',
  width: '100%',
  font: 'inherit',
  color: color.primaryWhite,
})
