import { useEffect, useRef, useState } from 'react'
import { container } from './index.css'
import { milliSecondsToGb } from '../../../../../util/game'
import { initDuration } from '..'

export type ScoreProps = {
  since: number
}

const Score: React.FC<ScoreProps> = ({ since }) => {
  const animationRef = useRef(0)
  const [point, setPoint] = useState(0)

  useEffect(() => {
    const animationFrame = () => {
      setPoint(milliSecondsToGb(Date.now() - since - initDuration * 1000))

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [since])

  return (
    <div className={container}>
      {point > 0 ? `${point.toFixed(1)}GB` : '初期化中'}
    </div>
  )
}

export default Score
