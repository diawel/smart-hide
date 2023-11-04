import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { useEffect, useRef } from 'react'
import Hider from './Hider'
import Seeker from './Seeker'

export type SeekingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Seeking: React.FC<SeekingProps> = ({ uuid, code, game, socketRef }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    let sum = 0
    for (const player in game.players) sum += game.players[player].score
    timeoutRef.current = setTimeout(() => {
      socketRef.current?.send(
        JSON.stringify({
          uuid,
          code,
          setGame: {
            ...game,
            state: 'finished',
          },
          setPlayer: {
            uuid,
            body: {
              ...game.players[uuid],
              score: game.players[uuid].score + 100 - sum,
            },
          },
        })
      )
    }, ((100 - sum) * 1000) / 0.2)

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [code, game, socketRef, uuid])

  if (uuid === game.seek?.target)
    return <Hider {...{ uuid, code, game, socketRef }} />
  else return <Seeker {...{ uuid, code, game, socketRef }} />
}

export default Seeking
