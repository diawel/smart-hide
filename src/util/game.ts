import { initDuration } from '../components/mixed/Seeking/Hider'
import { Game } from '../pages/Play'
import { gameConfig } from './constants'

export const milliSecondsToGb = (milliSeconds: number) =>
  (milliSeconds / 1000) * gameConfig.uploadSpeed

export const calcTotalScore = (game: Game) => {
  let totalScore = 0
  for (const uuid in game.players) totalScore += game.players[uuid].score
  if (game.seek)
    totalScore += Math.max(
      milliSecondsToGb(Date.now() - game.seek.since - initDuration * 1000),
      0
    )
  return totalScore
}

export const calcRemainMilliSeconds = (game: Game) =>
  ((gameConfig.fullScore - calcTotalScore(game)) * 1000) /
  gameConfig.uploadSpeed
