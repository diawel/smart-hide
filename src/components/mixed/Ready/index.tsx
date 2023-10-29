import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import Click from '../../bit/Click'
import SquareButton from '../../bit/SquareButton'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'

export type ReadyProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Ready: React.FC<ReadyProps> = ({ uuid, code, game, socketRef }) => {
  return (
    <ColumnWithTitle title="最初に逃げるプレイヤーを決めてください">
      <Click
        onClick={() => {
          socketRef.current?.send(
            JSON.stringify({
              uuid,
              code,
              setGame: {
                ...game,
                state: 'ongoing',
                interval: {
                  nextPlayer: uuid,
                },
              },
            })
          )
        }}
      >
        <SquareButton text="私が逃げる" />
      </Click>
    </ColumnWithTitle>
  )
}

export default Ready
