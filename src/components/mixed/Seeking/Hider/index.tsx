import ReconnectingWebSocket from 'reconnecting-websocket'
import { Game } from '../../../../pages/Play'
import GlobalWrapper from '../../../chunk/GlobalWrapper'
import Paragraph from '../../../chunk/Paragraph'
import Plain from '../../../chunk/Paragraph/Plain'
import Strong from '../../../chunk/Paragraph/Strong'
import ContentWithLabel from '../../../chunk/ContentWithLabel'
import GameProgress from '../../../bit/GameProgress'
import { useEffect, useRef } from 'react'
import { calcRemainMilliSeconds } from '../../../../util/game'
import { container } from './index.css'
import Score from './Score'
import { simpleAnimate } from '../../../../util/commonKeyframes.css'
import { gameConfig } from '../../../../util/constants'

export type HiderProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

export const initDuration = 5

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
            [uuid]: {
              ...game.players[uuid],
              score:
                game.players[uuid].score + gameConfig.fullScore - totalScore,
            },
          },
        })
      )
    }, Math.max(0, calcRemainMilliSeconds(game)))

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [code, game, socketRef, uuid])
  return (
    <GlobalWrapper>
      <div className={container}>
        <Paragraph>
          <div className={simpleAnimate.slideIn}>
            <Plain text="データをアップロード中。" />
          </div>
          <div
            className={simpleAnimate.slideIn}
            style={{ animationDelay: '0.6s' }}
          >
            <Strong text="その場に" />
          </div>
          <div
            className={simpleAnimate.slideIn}
            style={{ animationDelay: '0.9s' }}
          >
            <Plain text="とどまって、できる限り多くのデータを送信せよ。" />
          </div>
        </Paragraph>
        <div
          className={simpleAnimate.fadeIn}
          style={{ animationDelay: '1.8s' }}
        >
          <ContentWithLabel title="今回送信しているデータ量">
            <Score since={game.seek!.since} />
          </ContentWithLabel>
        </div>
        <div
          className={simpleAnimate.fadeIn}
          style={{ animationDelay: '2.4s' }}
        >
          <ContentWithLabel title="アップロードされたデータの総量">
            <GameProgress {...{ game }} />
          </ContentWithLabel>
        </div>
      </div>
    </GlobalWrapper>
  )
}

export default Hider
