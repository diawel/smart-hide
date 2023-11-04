import { useEffect, useRef, useState } from 'react'
import { Game } from '../../../pages/Play'
import { gameConfig } from '../../../util/constants'
import { calcTotalScore } from '../../../util/game'
import { container, progress, text } from './index.css'

export type GameProgressProps = {
  game: Game
}

const GameProgress: React.FC<GameProgressProps> = ({ game }) => {
  const animationRef = useRef(0)
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
    const animationFrame = () => {
      setTotalScore(calcTotalScore(game))

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [game])

  return (
    <div className={container}>
      <div className={text.background}>
        {totalScore.toFixed(1)}GB / {gameConfig.fullScore}GB
      </div>
      <div
        className={progress}
        style={{ width: `${(totalScore / gameConfig.fullScore) * 100}%` }}
      />
      <div className={text.overay}>
        {totalScore.toFixed(1)}GB / {gameConfig.fullScore}GB
      </div>
    </div>
  )
}

export default GameProgress
