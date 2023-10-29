import { style } from '@vanilla-extract/css'

export const container = style({
  position: 'relative',
})

export const cameraWrapper = style({
  position: 'absolute',
  top: 0,
  zIndex: 0,
})

export const content = style({
  position: 'relative',
  zIndex: 1,
})
