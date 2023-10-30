import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Setting from '../../components/mixed/Setting'
import Result from '../../components/mixed/Result'
import GlobalWrapper from '../../components/chunk/GlobalWrapper'
import _ from 'lodash'
import Waiting from '../../components/mixed/Waiting'
import Ready from '../../components/mixed/Ready'
import Interval from '../../components/mixed/Interval'
import Hiding from '../../components/mixed/Hiding'
import Seeking from '../../components/mixed/Seeking'

export type Player = {
  name: string
  icon: string
  state: 'preparing' | 'ready' | 'disconnected'
  score: number
}

export type Game = {
  state: 'preparing' | 'ready' | 'ongoing' | 'finished'
  turn: number
  players: {
    [uuid: string]: Player
  }
  seek?: {
    image: {
      src: string
      filter: number
    }
    target: string
    since: number
    maxScore: number
  }
  hide?: {
    player: string
    since: number
  }
  interval?: {
    nextPlayer: string
  }
}

const Play: React.FC = () => {
  const { code } = useParams()
  const socketRef = useRef<ReconnectingWebSocket>()
  const uuidRef = useRef<string>(
    localStorage.getItem(`uuid-${code}`) ?? crypto.randomUUID()
  )
  const [player, setPlayer] = useState<Player>({
    name: localStorage.getItem('playerName') ?? 'プレイヤー',
    icon: '/images/default_player.png',
    state: 'preparing',
    score: 0,
  })
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
    localStorage.setItem('playerName', player.name)
  }, [player.name])

  useEffect(() => {
    localStorage.setItem(`uuid-${code}`, uuidRef.current)
  }, [])

  useEffect(() => {
    if (!_.isEqual(game?.players?.[uuidRef.current], player)) {
      socketRef.current?.send(
        JSON.stringify({
          uuid: uuidRef.current,
          code,
          setPlayer: {
            uuid: uuidRef.current,
            body: player,
          },
        })
      )
    }
  }, [code, game, player])

  useEffect(() => {
    if (game?.state == 'preparing') {
      let allReady = false
      if (Object.keys(game.players).length >= 3) {
        allReady = true
        for (const each in game.players) {
          if (game.players[each].state != 'ready') {
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
  }, [code, game])

  if (!game) return <GlobalWrapper />
  if (game.state == 'preparing') {
    if (player.state == 'preparing') {
      return (
        <GlobalWrapper>
          <Setting {...{ code, player, setPlayer }} />
        </GlobalWrapper>
      )
    }
    if (player.state == 'ready') {
      return (
        <GlobalWrapper>
          <Waiting {...{ game, player, setPlayer }} />
        </GlobalWrapper>
      )
    }
  }
  if (game.state == 'ready') {
    return (
      <GlobalWrapper>
        <Ready {...{ uuid: uuidRef.current, code, game, socketRef }} />
      </GlobalWrapper>
    )
  }
  if (game.state == 'ongoing') {
    if (game.interval) {
      return (
        <GlobalWrapper>
          <Interval {...{ uuid: uuidRef.current, code, game, socketRef }} />
        </GlobalWrapper>
      )
    }
    if (game.hide) {
      return (
        <GlobalWrapper>
          <Hiding {...{ uuid: uuidRef.current, code, game, socketRef }} />
        </GlobalWrapper>
      )
    }
    if (game.seek) {
      return (
        <GlobalWrapper>
          <Seeking {...{ uuid: uuidRef.current, code, game, socketRef }} />
        </GlobalWrapper>
      )
    }
    return (
      <GlobalWrapper>
        {/* <Playing {...{ qrText, game, player, setPlayer, timer, code, socketRef }} /> */}
      </GlobalWrapper>
    )
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
