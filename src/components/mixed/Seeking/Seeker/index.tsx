import ReconnectingWebSocket from 'reconnecting-websocket'
import { Game } from '../../../../pages/Play'
import { container, image, images } from './index.css'
import Paragraph from '../../../chunk/Paragraph'
import Plain from '../../../chunk/Paragraph/Plain'
import Strong from '../../../chunk/Paragraph/Strong'
import { useEffect, useState } from 'react'
import QrReader from '../../../bit/QrReader'
import GameProgress from '../../../bit/GameProgress'
import ContentWithLabel from '../../../chunk/ContentWithLabel'
import GlobalWrapper from '../../../chunk/GlobalWrapper'

export type SeekerProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Seeker: React.FC<SeekerProps> = ({ uuid, code, game, socketRef }) => {
  const [scanReseult, setScanResult] = useState<string | null>(null)

  useEffect(() => {
    if (scanReseult)
      socketRef.current?.send(
        JSON.stringify({
          uuid,
          code,
          setPlayer: {
            uuid: game.seek!.target,
            body: {
              ...game.players[game.seek!.target],
              score:
                game.players[game.seek!.target].score +
                (((() => Date.now())() - game.seek!.since) / 1000) * 0.2,
            },
          },
          setGame: {
            ...game,
            interval: {
              nextPlayer: uuid,
            },
            seek: undefined,
          },
        })
      )
  }, [code, game, scanReseult, socketRef, uuid])

  return (
    <GlobalWrapper>
      <div className={container}>
        <Paragraph>
          <Plain text="画像を手がかりにデータチップを探し出し" />
          <Strong text="スキャン" />
          <Plain text="して取り返せ。" />
        </Paragraph>
        <div className={images}>
          <img className={image} src={game.seek!.image.src} />
          <div className={image}>
            <QrReader
              setResult={(result) => {
                if (result == 'smart-hide:pass') setScanResult(result)
              }}
            />
          </div>
        </div>
        <ContentWithLabel title="アップロードされたデータの総量">
          <GameProgress {...{ game }} />
        </ContentWithLabel>
      </div>
    </GlobalWrapper>
  )
}

export default Seeker
