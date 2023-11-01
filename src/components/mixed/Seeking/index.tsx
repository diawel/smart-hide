import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import QrReader from '../../bit/QrReader'
import { useEffect, useRef, useState } from 'react'
import Point from './Point'

export type SeekingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Seeking: React.FC<SeekingProps> = ({ uuid, code, game, socketRef }) => {
  const [isScanned, setIsScanned] = useState(false)
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
    return (
      <ColumnWithTitle title="じっと隠れよう">
        <ContentWithTitle title="いま送信しているデータ量">
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
                console.log(Date.now() - game.seek!.since)

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
                          (((() => Date.now())() - game.seek!.since) / 1000) *
                            0.2,
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
                setIsScanned(true)
              }
            }}
          />
        </ContentWithTitle>
      </ColumnWithTitle>
    )
}

export default Seeking
