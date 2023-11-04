import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Setting from '../../components/mixed/Setting'
import Result from '../../components/mixed/Result'
import GlobalWrapper from '../../components/chunk/GlobalWrapper'
import Waiting from '../../components/mixed/Waiting'
import Ready from '../../components/mixed/Ready'
import Hiding from '../../components/mixed/Hiding'
import Seeking from '../../components/mixed/Seeking'

type Player = {
  name: string
  state: 'preparing' | 'ready' | 'disconnected'
  score: number
  hideCount: number
}

export type MetaGame = {
  state: 'preparing' | 'ready' | 'ongoing' | 'finished'
  seek?: {
    image: {
      src: string
      filter: number
    }
    target: string
    since: number
  }
  hide?: {
    player: string
    since: number
  }
}

export type Game = MetaGame & {
  players: {
    [uuid: string]: Player
  }
}

const Play: React.FC = () => {
  const { code } = useParams()
  const socketRef = useRef<ReconnectingWebSocket>()
  const uuidRef = useRef<string>(
    localStorage.getItem(`uuid-${code}`) ?? crypto.randomUUID()
  )
  const [name, setName] = useState(
    localStorage.getItem('playerName') ?? 'プレイヤー'
  )
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    socketRef.current = new ReconnectingWebSocket(
      // `ws://${location.hostname}:5050`
      // 'wss://b111wc69-5050.asse.devtunnels.ms/'
      'wss://smart-hide-backend.onrender.com'
    )

    return () => {
      socketRef.current?.close()
    }
  }, [])

  useEffect(() => {
    const update = (event: MessageEvent) => {
      const parsed = JSON.parse(event.data)
      console.log(parsed)
      setGame(parsed.game)
    }
    socketRef.current?.addEventListener('message', update)

    const init = () => {
      socketRef.current?.send(
        JSON.stringify({
          uuid: uuidRef.current,
          code,
        })
      )
    }
    socketRef.current?.addEventListener('open', init)

    return () => {
      socketRef.current?.removeEventListener('open', init)
      socketRef.current?.removeEventListener('message', update)
    }
  }, [code])

  useEffect(() => {
    localStorage.setItem('playerName', name)
  }, [name])

  useEffect(() => {
    localStorage.setItem(`uuid-${code}`, uuidRef.current)
  }, [code])

  useEffect(() => {
    if (game && game.players[uuidRef.current]?.name != name)
      socketRef.current?.send(
        JSON.stringify({
          uuid: uuidRef.current,
          code,
          setPlayer: {
            [uuidRef.current]: {
              ...(game.players[uuidRef.current] ?? {
                state: 'preparing',
                score: 0,
                hideCount: 0,
              }),
              name,
            },
          },
        })
      )
  }, [code, game, name])

  useEffect(() => {
    if (game?.state == 'preparing') {
      let allReady = false
      if (Object.keys(game.players).length >= 3) {
        allReady = true
        for (const each in game.players) {
          if (game.players[each].state == 'preparing') {
            allReady = false
            break
          }
        }
      }

      if (allReady) {
        socketRef.current?.send(
          JSON.stringify({
            uuid: uuidRef.current,
            code,
            setGame: {
              ...game,
              state: 'ready',
            },
          })
        )
      }
    }
    if (game?.players[uuidRef.current]?.state == 'disconnected')
      socketRef.current?.send(
        JSON.stringify({
          uuid: uuidRef.current,
          code,
          setPlayer: {
            [uuidRef.current]: {
              ...game.players[uuidRef.current],
              state: game.state == 'preparing' ? 'preparing' : 'ready',
            },
          },
        })
      )
  }, [code, game])

  if (!game?.players[uuidRef.current]) return <GlobalWrapper />
  if (game.state == 'preparing') {
    if (game.players[uuidRef.current].state == 'preparing') {
      return (
        <Setting
          {...{ uuid: uuidRef.current, code, game, socketRef, name, setName }}
        />
      )
    }
    if (game.players[uuidRef.current].state == 'ready') {
      return <Waiting {...{ uuid: uuidRef.current, code, game, socketRef }} />
    }
  }
  if (game.state == 'ready') {
    return <Ready {...{ uuid: uuidRef.current, code, game, socketRef }} />
  }
  if (game.state == 'ongoing') {
    if (game.hide) {
      return <Hiding {...{ uuid: uuidRef.current, code, game, socketRef }} />
    }
    if (game.seek) {
      return <Seeking {...{ uuid: uuidRef.current, code, game, socketRef }} />
    }
  }
  if (game.state == 'finished') {
    return (
      <GlobalWrapper>
        <Result {...{ game }} />
      </GlobalWrapper>
    )
  }
}

export default Play
