import ReconnectingWebSocket from 'reconnecting-websocket'
import { Game } from '../../../../pages/Play'
import GlobalWrapper from '../../../chunk/GlobalWrapper'
import Paragraph from '../../../chunk/Paragraph'
import Plain from '../../../chunk/Paragraph/Plain'
import Strong from '../../../chunk/Paragraph/Strong'
import ContentWithLabel from '../../../chunk/ContentWithLabel'
import GameProgress from '../../../bit/GameProgress'
import Score from './Score'
import { useEffect, useRef } from 'react'
import { calcRemainMilliSeconds } from '../../../../util/game'
import { container } from './index.css'

export type HiderProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Hider: React.FC<HiderProps> = ({ uuid, code, game, socketRef }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    let totalScore = 0
    for (const player in game.players) totalScore += game.players[player].score
    timeoutRef.current = setTimeout(() => {
      socketRef.current?.send(
        JSON.stringify({
          uuid,
          code,
          setGame: {
            ...game,
            seek: undefined,
            state: 'finished',
          },
          setPlayer: {
            uuid,
            body: {
              ...game.players[uuid],
              score: game.players[uuid].score + 100 - totalScore,
            },
          },
        })
      )
    }, calcRemainMilliSeconds(game))

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [code, game, socketRef, uuid])
  return (
    <GlobalWrapper gradient>
      <div className={container}>
        <Paragraph>
          <Plain text="データをアップロード中。" />
          <Strong text="その場に" />
          <Plain text="とどまって、できる限り多くのデータを送信しろ。" />
        </Paragraph>
        <ContentWithLabel title="今送信しているデータ量">
          <Score since={game.seek!.since} />
        </ContentWithLabel>
        <ContentWithLabel title="アップロードされたデータの総量">
          <GameProgress {...{ game }} />
        </ContentWithLabel>
      </div>
    </GlobalWrapper>
  )
}

export default Hider
