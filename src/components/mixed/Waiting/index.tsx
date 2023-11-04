import { Game } from '../../../pages/Play'
import Click from '../../bit/Click'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { container, playerList } from './index.css'
import ContentWithLabel from '../../chunk/ContentWithLabel'
import RoundButton from '../../bit/RoundButton'
import Title from '../../bit/Title'
import GlobalWrapper from '../../chunk/GlobalWrapper'

export type WaitingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Waiting: React.FC<WaitingProps> = ({ uuid, code, game, socketRef }) => {
  const preparingPlayers: string[] = []
  const readyPlayers: string[] = []
  for (const uuid in game.players) {
    const player = game.players[uuid]
    if (player.state == 'preparing') preparingPlayers.push(uuid)
    if (player.state == 'ready') readyPlayers.push(uuid)
  }

  return (
    <GlobalWrapper>
      <div className={container}>
        <Title />
        <ContentWithLabel title="ミッション準備中">
          <div className={playerList}>
            {preparingPlayers.map((uuid) => (
              <div key={uuid}>{game.players[uuid].name}</div>
            ))}
          </div>
        </ContentWithLabel>
        <ContentWithLabel title="ミッション準備完了">
          <div className={playerList}>
            {readyPlayers.map((uuid) => (
              <div key={uuid}>{game.players[uuid].name}</div>
            ))}
          </div>
        </ContentWithLabel>
        <Click
          onClick={() => {
            socketRef.current?.send(
              JSON.stringify({
                uuid,
                code,
                setPlayer: {
                  [uuid]: {
                    ...game.players[uuid],
                    state: 'preparing',
                  },
                },
              })
            )
          }}
        >
          <RoundButton text="準備に戻る" />
        </Click>
      </div>
    </GlobalWrapper>
  )
}

export default Waiting
