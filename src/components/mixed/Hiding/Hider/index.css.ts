import { style } from '@vanilla-extract/css'
import { margin } from '../../../../util/constants'
import { fadeOut } from '../../../../util/commonKeyframes.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: margin.block,
})

export const done = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  gap: margin.block,
  animation: `${fadeOut} 0.6s ease 2.4s forwards`,
})
