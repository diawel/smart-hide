import { style } from '@vanilla-extract/css'
import { margin } from '../../../../util/constants'
import { fadeIn } from '../../../../util/commonKeyframes.css'

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
  animation: `${fadeIn} 0.6s ease 1.5s backwards`,
})

export const image = style({
  width: '50%',
  height: '100%',
})
