import { RankedPlayer } from '..'
import { gameConfig } from '../../../../util/constants'
import RoundButton from '../../../bit/RoundButton'
import {
  container,
  label,
  scoreBar,
  scoreContainer,
  text,
  upper,
} from './index.css'

export type PlayerProps = RankedPlayer

const Player: React.FC<PlayerProps> = ({ rank, name, score, hideCount }) => {
  const scoreText = `${score.toFixed(1)}GB`
  return (
    <div className={container}>
      <div className={upper}>
        <div className={label}>
          {rank}. {name}
        </div>
        <RoundButton text={`かくれた回数 ${hideCount}`} />
      </div>
      <div className={scoreContainer}>
        <div className={text.background}>{scoreText}</div>
        <div
          className={scoreBar}
          style={{ width: `${(score / gameConfig.fullScore) * 100}%` }}
        />
        <div className={text.overay}>{scoreText}</div>
      </div>
    </div>
  )
}

export default Player
