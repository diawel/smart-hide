import ReconnectingWebSocket from 'reconnecting-websocket'
import { Game } from '../../../../pages/Play'
import { container, image, images } from './index.css'
import Paragraph from '../../../chunk/Paragraph'
import Plain from '../../../chunk/Paragraph/Plain'
import Strong from '../../../chunk/Paragraph/Strong'
import { useEffect, useRef, useState } from 'react'
import QrReader from '../../../bit/QrReader'
import GameProgress from '../../../bit/GameProgress'
import ContentWithLabel from '../../../chunk/ContentWithLabel'
import GlobalWrapper from '../../../chunk/GlobalWrapper'
import { milliSecondsToGb } from '../../../../util/game'
import ShuffledImage from '../../../bit/ShuffledImage'
import { simpleAnimate } from '../../../../util/commonKeyframes.css'

export type SeekerProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Seeker: React.FC<SeekerProps> = ({ uuid, code, game, socketRef }) => {
  const [scanReseult, setScanResult] = useState<string | null>(null)
  const sendRef = useRef(false)

  useEffect(() => {
    if (scanReseult == 'smart-hide:pass' && !sendRef.current) {
      socketRef.current?.send(
        JSON.stringify({
          uuid,
          code,
          setPlayer: {
            [game.seek!.target]: {
              ...game.players[game.seek!.target],
              score:
                game.players[game.seek!.target].score +
                milliSecondsToGb(Date.now() - game.seek!.since),
            },
            [uuid]: {
              ...game.players[uuid],
              hideCount: game.players[uuid].hideCount + 1,
            },
          },
          setGame: {
            ...game,
            hide: {
              player: uuid,
              since: Date.now(),
            },
            seek: undefined,
          },
        })
      )
      sendRef.current = true
    }
  }, [code, game, scanReseult, socketRef, uuid])

  return (
    <GlobalWrapper>
      <div className={container}>
        <Paragraph>
          <div className={simpleAnimate.slideIn}>
            <Plain text="画像を手がかりにディスクを探し出し" />
          </div>
          <div
            className={simpleAnimate.slideIn}
            style={{ animationDelay: '0.6s' }}
          >
            <Strong text="スキャン" />
          </div>
          <div
            className={simpleAnimate.slideIn}
            style={{ animationDelay: '0.9s' }}
          >
            <Plain text="して取り返せ。" />
          </div>
        </Paragraph>
        <div className={images}>
          <div className={image}>
            <ShuffledImage src={game.seek!.image.src} />
          </div>
          <div className={image}>
            <QrReader setResult={setScanResult} />
          </div>
        </div>
        <div
          className={simpleAnimate.fadeIn}
          style={{ animationDelay: '2.1s' }}
        >
          <ContentWithLabel title="アップロードされたデータの総量">
            <GameProgress {...{ game }} />
          </ContentWithLabel>
        </div>
      </div>
    </GlobalWrapper>
  )
}

export default Seeker
