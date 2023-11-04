import { Game } from '../pages/Play'

export const milliSecondsToGb = (milliSeconds: number) =>
  (milliSeconds / 1000) * 0.2

export const calcTotalScore = (game: Game) => {
  let totalScore = 0
  for (const uuid in game.players) totalScore += game.players[uuid].score
  if (game.seek) totalScore += milliSecondsToGb(Date.now() - game.seek.since)
  return totalScore
}

export const calcRemainMilliSeconds = (game: Game) =>
  ((100 - calcTotalScore(game)) * 1000) / 0.2
