import { Fragment, useEffect, useState } from 'react'
import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import { Game } from '../../../pages/Play'
import SquareButton from '../../bit/SquareButton'
import Click from '../../bit/Click'
import { useNavigate } from 'react-router-dom'

export type ResultProps = {
  game: Game
}

type Ranking = { rank: number; name: string; score: number }[]

const Result: React.FC<ResultProps> = ({ game }) => {
  const navigate = useNavigate()
  const [ranking, setRanking] = useState<Ranking>([])

  useEffect(() => {
    if (ranking.length < Object.keys(game.players).length) {
      const playerList: { rank: number; name: string; score: number }[] = []
      for (const uuid in game.players) {
        const player = game.players[uuid]
        playerList.push({
          rank: 0,
          name: player.name,
          score: player.score,
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
    <ColumnWithTitle title="ゲーム終了！">
      <ContentWithTitle title="ランキング">
        {ranking.map((player, index) => (
          <Fragment
            key={`${player.rank}-${player.name}-${player.score}-${index}`}
          >
            <SquareButton
              text={`${player.rank}位 ${player.name} ${player.score}P`}
            />
          </Fragment>
        ))}
      </ContentWithTitle>
      <Click
        onClick={() => {
          navigate('/')
        }}
      >
        <SquareButton text="ホームに戻る" />
      </Click>
    </ColumnWithTitle>
  )
}

export default Result
