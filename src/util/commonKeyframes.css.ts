import { keyframes, style } from '@vanilla-extract/css'

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const slideIn = keyframes({
  from: { transform: 'translateY(30%)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

export const simpleAnimate = {
  fadeIn: style({ animation: `${fadeIn} 0.6s ease backwards` }),
  slideIn: style({ animation: `${slideIn} 0.6s ease backwards` }),
}
