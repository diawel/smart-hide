import { ReactNode, useEffect, useRef, useState } from 'react'
import { container, scannerWrapper } from './index.css'
import { progress, progressBar } from './index.css'
import { gameConfig } from '../../../../../util/constants'

export type ScannerContainerProps = {
  scanner: ReactNode
  until: number
}

const ScannerContainer: React.FC<ScannerContainerProps> = ({
  scanner,
  until,
}) => {
  const animationRef = useRef(0)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const animationFrame = () => {
      setPercent(((until - Date.now()) / 1000 / gameConfig.hideDuration) * 100)

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [until])

  return (
    <div className={container}>
      <div className={progressBar.top}>
        <div
          className={progress}
          style={{ width: `${Math.min(25, Math.max(75, percent) - 75) * 4}%` }}
        />
      </div>
      <div className={progressBar.right}>
        <div
          className={progress}
          style={{ width: `${Math.min(25, Math.max(50, percent) - 50) * 4}%` }}
        />
      </div>
      <div className={progressBar.bottom}>
        <div
          className={progress}
          style={{ width: `${Math.min(25, Math.max(25, percent) - 25) * 4}%` }}
        />
      </div>
      <div className={progressBar.left}>
        <div
          className={progress}
          style={{ width: `${Math.min(25, Math.max(0, percent)) * 4}%` }}
        />
      </div>
      <div className={scannerWrapper}>{scanner}</div>
    </div>
  )
}

export default ScannerContainer
