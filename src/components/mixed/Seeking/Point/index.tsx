import { useEffect, useRef, useState } from 'react'
import SquareButton from '../../../bit/SquareButton'
import { formatSeconds } from '../../../../util/time'

export type PointProps = {
  since: number
}

const Point: React.FC<PointProps> = ({ since }) => {
  const animationRef = useRef(0)
  const [point, setPoint] = useState(0)

  useEffect(() => {
    const animationFrame = () => {
      setPoint((Date.now() - since) / 1000)

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [since])

  return <SquareButton text={formatSeconds(point)} />
}

export default Point
