import { useEffect, useRef, useState } from 'react'
import SquareButton from '../../../bit/SquareButton'

export type PointProps = {
  since: number
}

const Point: React.FC<PointProps> = ({ since }) => {
  const animationRef = useRef(0)
  const [point, setPoint] = useState(0)

  useEffect(() => {
    const animationFrame = () => {
      setPoint(((Date.now() - since) / 1000) * 0.2)

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [since])

  return <SquareButton text={`${point.toFixed(1)}GB`} />
}

export default Point
