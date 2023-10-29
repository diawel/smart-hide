import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  padding: '64px 32px',
  flexDirection: 'column',
  gap: '64px',
})

export const column = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  width: '240px',
  margin: '0 auto',
})
