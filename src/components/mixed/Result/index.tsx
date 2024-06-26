import { useEffect, useState } from 'react'
import { Game } from '../../../pages/Play'
import Click from '../../bit/Click'
import { useNavigate } from 'react-router-dom'
import { container, playerWrapper } from './index.css'
import Title from '../../bit/Title'
import Player from './Player'
import RoundButton from '../../bit/RoundButton'
import GlobalWrapper from '../../chunk/GlobalWrapper'
import Popup from './Popup'

export type ResultProps = {
  game: Game
}

export type RankedPlayer = {
  rank: number
  name: string
  score: number
  hideCount: number
}

const Result: React.FC<ResultProps> = ({ game }) => {
  const navigate = useNavigate()
  const [ranking, setRanking] = useState<RankedPlayer[]>([])

  useEffect(() => {
    if (ranking.length < Object.keys(game.players).length) {
      const playerList: RankedPlayer[] = []
      for (const uuid in game.players) {
        const player = game.players[uuid]
        playerList.push({
          rank: 0,
          name: player.name,
          score: player.score,
          hideCount: player.hideCount,
        })
      }
      playerList.sort((a, b) => b.score - a.score)

      playerList.forEach((player, index) => {
        player.rank = index + 1
      })

      let betterScore = -1
      for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].score == betterScore) {
          playerList[i].rank = playerList[i - 1].rank
        }
        betterScore = playerList[i].score
      }

      setRanking(playerList)
    }
  }, [ranking, game])

  return (
    <Popup>
      <GlobalWrapper gradient>
        <div className={container}>
          <Title />
          {ranking.map((player, index) => (
            <div
              key={`${player.rank}-${player.name}-${player.score}-${index}`}
              className={playerWrapper}
              style={{ animationDelay: `${3.6 + index * 0.15}s` }}
            >
              <Player {...player} />
            </div>
          ))}
          <Click
            onClick={() => {
              navigate('/')
            }}
          >
            <RoundButton text="ホームに戻る" />
          </Click>
        </div>
      </GlobalWrapper>
    </Popup>
  )
}

export default Result
