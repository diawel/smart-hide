import { useEffect, useRef, useState } from 'react'
import SquareButton from '../../bit/SquareButton'
import { keyDuration } from '../../mixed/Playing'

export type KeyProps = {
  name: string
  until: Date
  destroyed: number
}

const Key: React.FC<KeyProps> = ({ name, until, destroyed }) => {
  const [timer, setTimer] = useState(keyDuration)
  const animationRef = useRef(0)

  useEffect(() => {
    const animationFrame = () => {
      setTimer(Math.floor((until.getTime() - Date.now()) / 1000))
      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [until])

  return (
    <div style={{ filter: `brightness(${100 - destroyed}%)` }}>
      <SquareButton text={`${name} - 残り${timer}秒`} />
    </div>
  )
}

export default Key
