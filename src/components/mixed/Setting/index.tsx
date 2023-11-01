import { QRCodeCanvas } from 'qrcode.react'
import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import { qrcodeWrapper } from './index.css'
import InputText from '../../bit/InputText'
import Click from '../../bit/Click'
import SquareButton from '../../bit/SquareButton'
import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'

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
    <ColumnWithTitle title="プレイヤーの準備">
      <ContentWithTitle title="参加用2次元コード">
        <div className={qrcodeWrapper}>
          <QRCodeCanvas
            value={`https://${location.host}/play/${code}`}
            style={{ width: '100%', height: '100%' }}
            includeMargin={true}
          />
        </div>
      </ContentWithTitle>
      <ContentWithTitle title="プレイヤー名">
        <InputText text={name} setText={setName} />
      </ContentWithTitle>
      <ContentWithTitle title="全員そろうと始まります">
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
          <SquareButton text="準備完了する" />
        </Click>
      </ContentWithTitle>
    </ColumnWithTitle>
  )
}

export default Setting
