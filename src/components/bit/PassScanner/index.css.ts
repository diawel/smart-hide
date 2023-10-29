import { style } from '@vanilla-extract/css'

export const container = style({
  position: 'relative',
  width: '100%',
})

export const video = style({
  position: 'absolute',
  top: 0,
  left: 0,
  objectFit: 'cover',
  width: '100%',
})

export const canvas = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
})
