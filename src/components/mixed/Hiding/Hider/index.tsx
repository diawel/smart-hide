import React, { useEffect, useRef, useState } from 'react'
import PassScanner from '../../../bit/PassScanner'
import { Game } from '../../../../pages/Play'
import { container, done } from './index.css'
import Paragraph from '../../../chunk/Paragraph'
import Strong from '../../../chunk/Paragraph/Strong'
import Plain from '../../../chunk/Paragraph/Plain'
import ScannerContainer from './ScannerContainer'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { gameConfig } from '../../../../util/constants'
import GlobalWrapper from '../../../chunk/GlobalWrapper'
import { simpleAnimate } from '../../../../util/commonKeyframes.css'

export type HideProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const extraDuration = 5

const Hider: React.FC<HideProps> = ({ uuid, code, game, socketRef }) => {
  const [scanReseult, setScanResult] = useState('')
  const [isTimeover, setIsTimeover] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (scanReseult) {
      timeoutRef.current = setTimeout(() => {
        socketRef.current?.send(
          JSON.stringify({
            uuid,
            code,
            setGame: {
              ...game,
              hide: undefined,
              seek: {
                image: {
                  src: scanReseult,
                  filter: 0,
                },
                target: uuid,
                since: Date.now(),
              },
            },
          })
        )
      }, 3000)

      return () => {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [code, game, scanReseult, socketRef, uuid])

  useEffect(() => {
    setTimeout(() => {
      setIsTimeover(true)
    }, Math.max(0, (gameConfig.hideDuration + extraDuration) * 1000 - (Date.now() - game.hide!.since)))
  }, [game.hide])

  if (scanReseult)
    return (
      <GlobalWrapper fitScreen>
        <div className={done}>
          <Paragraph key="done">
            <div className={simpleAnimate.slideIn}>
              <Strong text="スキャン完了" />
            </div>
          </Paragraph>
        </div>
      </GlobalWrapper>
    )
  return (
    <GlobalWrapper>
      <div className={container}>
        {isTimeover ? (
          <Paragraph key="timeout">
            <div className={simpleAnimate.slideIn}>
              <Strong text="今すぐ" />
            </div>
            <div
              className={simpleAnimate.slideIn}
              style={{ animationDelay: '0.3s' }}
            >
              <Plain text="データを送れ。" />
            </div>
          </Paragraph>
        ) : (
          <Paragraph>
            <div className={simpleAnimate.slideIn}>
              <Strong text="どこかに隠れて" />
            </div>
            <div
              className={simpleAnimate.slideIn}
              style={{ animationDelay: '0.3s' }}
            >
              <Plain text="データを送れ。" />
            </div>
            <div
              className={simpleAnimate.slideIn}
              style={{ animationDelay: '0.9s' }}
            >
              <Plain text="持ち出したデータチップをスキャンすると、送信を開始できる。" />
            </div>
          </Paragraph>
        )}
        <div
          className={simpleAnimate.fadeIn}
          style={{ animationDelay: '1.5s' }}
        >
          <ScannerContainer
            scanner={<PassScanner onScan={setScanResult} />}
            until={
              game.hide!.since +
              (gameConfig.hideDuration + extraDuration) * 1000
            }
          />
        </div>
      </div>
    </GlobalWrapper>
  )
}

export default Hider
