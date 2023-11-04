import { useEffect, useRef, useState } from 'react'
import { container } from './index.css'
import { milliSecondsToGb } from '../../../../../util/game'

export type ScoreProps = {
  since: number
}

const Score: React.FC<ScoreProps> = ({ since }) => {
  const animationRef = useRef(0)
  const [point, setPoint] = useState(0)

  useEffect(() => {
    const animationFrame = () => {
      setPoint(milliSecondsToGb(Date.now() - since))

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [since])

  return <div className={container}>{point.toFixed(1)}GB</div>
}

export default Score
