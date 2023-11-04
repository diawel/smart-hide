import { container } from './index.css'
import InputText from '../../bit/InputText'
import Click from '../../bit/Click'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Title from '../../bit/Title'
import JoinBanner from '../../chunk/JoinBanner'
import ContentWithLabel from '../../chunk/ContentWithLabel'
import RoundButton from '../../bit/RoundButton'

export type SettingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
  name: string
  setName: (name: string) => void
}

const Setting: React.FC<SettingProps> = ({
  uuid,
  code,
  game,
  socketRef,
  name,
  setName,
}) => {
  return (
    <div className={container}>
      <Title />
      <JoinBanner code={code} />
      <ContentWithLabel title="コードネームを入力">
        <InputText text={name} setText={setName} />
      </ContentWithLabel>
      <Click
        onClick={() => {
          if (name.length == 0) alert('プレイヤー名を入力してください')
          else {
            socketRef.current?.send(
              JSON.stringify({
                uuid,
                code,
                setPlayer: {
                  uuid,
                  body: {
                    ...game.players[uuid],
                    name,
                    state: 'ready',
                  },
                },
              })
            )
          }
        }}
      >
        <RoundButton text="準備完了する" />
      </Click>
    </div>
  )
}

export default Setting
