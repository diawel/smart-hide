import { style } from '@vanilla-extract/css'
import { margin } from '../../util/constants'

export const container = style({
  paddingTop: '45svh',
  display: 'flex',
  flexDirection: 'column',
  gap: margin.siderail,
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
