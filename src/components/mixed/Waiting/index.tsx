import { Fragment } from 'react'
import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import { Game } from '../../../pages/Play'
import SquareButton from '../../bit/SquareButton'
import Click from '../../bit/Click'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { container, playerList } from './index.css'
import ContentWithLabel from '../../chunk/ContentWithLabel'
import RoundButton from '../../bit/RoundButton'
import Title from '../../bit/Title'

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
    <div className={container}>
      <Title />
      <ContentWithLabel title="ミッション準備中">
        <div className={playerList}>
          {preparingPlayers.map((uuid) => (
            <div>{game.players[uuid].name}</div>
          ))}
        </div>
      </ContentWithLabel>
      <ContentWithLabel title="ミッション準備完了">
        <div className={playerList}>
          {readyPlayers.map((uuid) => (
            <div>{game.players[uuid].name}</div>
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
                uuid,
                body: {
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
  )

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
            socketRef.current?.send(
              JSON.stringify({
                uuid,
                code,
                setPlayer: {
                  uuid,
                  body: {
                    ...game.players[uuid],
                    state: 'preparing',
                  },
                },
              })
            )
          }}
        >
          <SquareButton text="やっぱり変える" />
        </Click>
      </ContentWithTitle>
    </ColumnWithTitle>
  )
}

export default Waiting
