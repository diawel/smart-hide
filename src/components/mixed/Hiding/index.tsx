import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import PassScanner from '../../bit/PassScanner'
import Timer from './Timer'
import { useEffect, useRef, useState } from 'react'

const hideDuration = 60

export type HidingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Hiding: React.FC<HidingProps> = ({ uuid, code, game, socketRef }) => {
  const animationRef = useRef(0)
  const [isTimeOver, setIsTimeOver] = useState(false)
  const [isScanned, setIsScanned] = useState(false)

  useEffect(() => {
    const animationFrame = () => {
      setIsTimeOver(Date.now() > game.hide!.since + hideDuration * 1000)

      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [game])

  const remaining = (
    <ContentWithTitle title="残り時間">
      <Timer until={game.hide!.since + hideDuration * 1000} />
    </ContentWithTitle>
  )

  if (uuid === game.hide?.player) {
    const scanner = (
      <PassScanner
        onScan={(result) => {
          if (!isScanned) {
            socketRef.current?.send(
              JSON.stringify({
                uuid,
                code,
                setGame: {
                  ...game,
                  hide: undefined,
                  seek: {
                    image: {
                      src: result,
                      filter: 0,
                    },
                    target: uuid,
                    since: Date.now(),
                  },
                },
              })
            )
            setIsScanned(true)
          }
        }}
      />
    )
    if (isTimeOver)
      return (
        <ColumnWithTitle title="時間切れ">
          {remaining}
          <ContentWithTitle title="いますぐスキャンして！">
            {scanner}
          </ContentWithTitle>
        </ColumnWithTitle>
      )
    else
      return (
        <ColumnWithTitle title="隠れる場所を決めてください">
          {remaining}
          <ContentWithTitle title="決まったらスキャン">
            {scanner}
          </ContentWithTitle>
        </ColumnWithTitle>
      )
  } else
    return (
      <ColumnWithTitle
        title={`${game.players[game.hide!.player].name} が逃げています`}
      >
        {remaining}
      </ColumnWithTitle>
    )
}

export default Hiding
