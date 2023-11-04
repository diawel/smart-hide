import React, { useEffect } from 'react'
import PassScanner from '../../../bit/PassScanner'
import { Game } from '../../../../pages/Play'
import { container } from './index.css'
import Paragraph from '../../../chunk/Paragraph'
import Strong from '../../../chunk/Paragraph/Strong'
import Plain from '../../../chunk/Paragraph/Plain'
import ScannerContainer from './ScannerContainer'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { gameConfig } from '../../../../util/constants'
import GlobalWrapper from '../../../chunk/GlobalWrapper'

export type HideProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Hider: React.FC<HideProps> = ({ uuid, code, game, socketRef }) => {
  const [scanReseult, setScanResult] = React.useState('')

  useEffect(() => {
    if (scanReseult)
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
  }, [code, game, scanReseult, socketRef, uuid])
  const scanner = <PassScanner onScan={setScanResult} />
  return (
    <GlobalWrapper>
      <div className={container}>
        <Paragraph>
          <Strong text="どこかに隠れて" />
          <Plain text="データを送れ。" />
          <Plain text="持ち出したデータチップをスキャンすると、送信を開始できる。" />
        </Paragraph>
        <ScannerContainer
          scanner={scanner}
          until={game.hide!.since + gameConfig.hideDuration * 1000}
        />
      </div>
    </GlobalWrapper>
  )
}

export default Hider
