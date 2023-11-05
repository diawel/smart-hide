import { style } from '@vanilla-extract/css'
import { margin } from '../../../../util/constants'
import { fadeOut } from '../../../../util/commonKeyframes.css'

export const container = style({
  position: 'absolute',
  top: 0,
  left: 0,
  animation: `${fadeOut} 0.6s ease 3s forwards`,
})

export const innerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
  justifyContent: 'center',
  height: '100%',
})
