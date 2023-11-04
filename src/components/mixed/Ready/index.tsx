import Click from '../../bit/Click'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Paragraph from '../../chunk/Paragraph'
import Plain from '../../chunk/Paragraph/Plain'
import Strong from '../../chunk/Paragraph/Strong'
import RoundButton from '../../bit/RoundButton'
import { container } from './index.css'
import GlobalWrapper from '../../chunk/GlobalWrapper'

export type ReadyProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Ready: React.FC<ReadyProps> = ({ uuid, code, game, socketRef }) => {
  return (
    <GlobalWrapper>
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
                setPlayer: {
                  [uuid]: {
                    ...game.players[uuid],
                    hideCount: game.players[uuid].hideCount + 1,
                  },
                },
                setGame: {
                  ...game,
                  state: 'ongoing',
                  hide: {
                    player: uuid,
                    since: Date.now(),
                  },
                },
              })
            )
          }}
        >
          <RoundButton text="私が持ち出せた" />
        </Click>
      </div>
    </GlobalWrapper>
  )
}

export default Ready
