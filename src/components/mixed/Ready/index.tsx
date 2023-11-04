import Click from '../../bit/Click'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Paragraph from '../../chunk/Paragraph'
import Plain from '../../chunk/Paragraph/Plain'
import Strong from '../../chunk/Paragraph/Strong'
import RoundButton from '../../bit/RoundButton'
import { container } from './index.css'

export type ReadyProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Ready: React.FC<ReadyProps> = ({ uuid, code, game, socketRef }) => {
  return (
    <div className={container}>
      <Paragraph>
        <Plain text="最初にデータチップを持ち出せるかは、もはや運任せだ。" />
        <Strong text="ジャンケン" />
        <Plain text="をして買った者が、データチップを持ち出すことができる。" />
      </Paragraph>
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
        <RoundButton text="私が持ち出せた" />
      </Click>
    </div>
  )
}

export default Ready
