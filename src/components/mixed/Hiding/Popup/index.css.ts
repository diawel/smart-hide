import { style } from '@vanilla-extract/css'
import { margin } from '../../../../util/constants'
import { fadeOut } from '../../../../util/commonKeyframes.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
  justifyContent: 'center',
  height: '100%',
  animation: `${fadeOut} 0.6s ease 3s forwards`,
})
