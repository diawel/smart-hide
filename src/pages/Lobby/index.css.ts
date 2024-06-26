import { style } from '@vanilla-extract/css'
import { margin } from '../../util/constants'
import { fadeIn } from '../../util/commonKeyframes.css'

export const container = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: margin.block,
  animation: `${fadeIn} 0.6s ease`,
})

export const graphic = style({
  width: `calc(100% + ${margin.siderail}px)`,
  marginRight: -margin.siderail,
})

export const title = style({
  fontSize: 64,
  fontWeight: 'bold',
  textAlign: 'center',
})

export const control = style({
  display: 'flex',
  gap: margin.siderail,
})
