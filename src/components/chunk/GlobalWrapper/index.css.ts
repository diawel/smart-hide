import { style, styleVariants } from '@vanilla-extract/css'
import {
  background,
  color,
  fontSize,
  fontWeight,
  margin,
} from '../../../util/constants'

export const container = styleVariants(background, (backgroundStyle) => [
  style({
    minHeight: '100svh',
  }),
  backgroundStyle,
])

export const innerContainer = style({
  padding: `${margin.buns}px ${margin.siderail}px`,
  color: color.primaryWhite,
  fontSize: fontSize.body,
  fontWeight: fontWeight.normal,
})
