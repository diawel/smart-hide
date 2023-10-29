import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import Click from '../../bit/Click'
import SquareButton from '../../bit/SquareButton'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'

export type IntervalProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Interval: React.FC<IntervalProps> = ({ uuid, code, game, socketRef }) => {
  if (uuid === game.interval?.nextPlayer)
    return (
      <ColumnWithTitle title="パスを受け取ってください">
        <Click
          onClick={() => {
            socketRef.current?.send(
              JSON.stringify({
                uuid,
                code,
                setGame: {
                  ...game,
                  interval: undefined,
                  hide: {
                    player: uuid,
                    since: Date.now(),
                  },
                },
              })
            )
          }}
        >
          <SquareButton text="準備完了" />
        </Click>
      </ColumnWithTitle>
    )
  else
    return (
      <ColumnWithTitle
        title={`${game.players[game.interval!.nextPlayer].name} が準備中です`}
      />
    )
}

export default Interval
