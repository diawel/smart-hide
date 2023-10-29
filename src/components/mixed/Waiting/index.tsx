import { Fragment } from 'react'
import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import { Game, Player } from '../../../pages/Play'
import SquareButton from '../../bit/SquareButton'
import Click from '../../bit/Click'

export type WaitingProps = {
  game: Game
  player: Player
  setPlayer: (player: Player) => void
}

const Waiting: React.FC<WaitingProps> = ({ game, player, setPlayer }) => {
  const preparingPlayers: string[] = []
  const readyPlayers: string[] = []
  for (const uuid in game.players) {
    const player = game.players[uuid]
    if (player.state == 'preparing') preparingPlayers.push(uuid)
    if (player.state == 'ready') readyPlayers.push(uuid)
  }

  return (
    <ColumnWithTitle title="プレイヤーの準備">
      <ContentWithTitle title="準備中">
        {preparingPlayers.map((uuid) => (
          <Fragment key={uuid}>
            <SquareButton text={game.players[uuid].name} />
          </Fragment>
        ))}
      </ContentWithTitle>
      <ContentWithTitle title="準備完了">
        {readyPlayers.map((uuid) => (
          <Fragment key={uuid}>
            <SquareButton text={game.players[uuid].name} />
          </Fragment>
        ))}
      </ContentWithTitle>
      <ContentWithTitle title="全員そろうと始まります">
        <Click
          onClick={() => {
            setPlayer({
              ...player,
              state: player.state == 'ready' ? 'preparing' : 'ready',
            })
          }}
        >
          <SquareButton text="やっぱり変える" />
        </Click>
      </ContentWithTitle>
    </ColumnWithTitle>
  )
}

export default Waiting
