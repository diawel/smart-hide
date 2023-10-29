import { useEffect, useRef, useState } from 'react'
import SquareButton from '../../../bit/SquareButton'
import { formatSeconds } from '../../../../util/time'

export type TimerProps = {
  until: number
}

const Timer: React.FC<TimerProps> = ({ until }) => {
  const animationRef = useRef(0)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const animationFrame = () => {
      setTimer(Math.floor((until - Date.now()) / 1000))

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [until])

  return <SquareButton text={formatSeconds(timer >= 0 ? timer : 0)} />
}

export default Timer
