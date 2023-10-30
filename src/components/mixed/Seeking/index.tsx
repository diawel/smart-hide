import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import QrReader from '../../bit/QrReader'
import { useState } from 'react'
import Point from './Point'

export type SeekingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Seeking: React.FC<SeekingProps> = ({ uuid, code, game, socketRef }) => {
  const [isScanned, setIsScanned] = useState(false)

  if (uuid === game.seek?.target)
    return (
      <ColumnWithTitle title="じっと隠れよう">
        <ContentWithTitle title="経過時間">
          <Point since={game.seek!.since} />
        </ContentWithTitle>
      </ColumnWithTitle>
    )
  else
    return (
      <ColumnWithTitle
        title={`${game.players[game.seek!.target].name} を探そう！`}
      >
        <img src={game.seek!.image.src} />
        <ContentWithTitle title="見つけたらQRコードをスキャンしよう">
          <QrReader
            setResult={(result) => {
              if (result == 'smart-hide:pass' && !isScanned) {
                socketRef.current?.send(
                  JSON.stringify({
                    uuid,
                    code,
                    setGame: {
                      ...game,
                      interval: {
                        nextPlayer: uuid,
                      },
                      hide: undefined,
                    },
                  })
                )
                setIsScanned(true)
              }
            }}
          />
        </ContentWithTitle>
      </ColumnWithTitle>
    )
}

export default Seeking
