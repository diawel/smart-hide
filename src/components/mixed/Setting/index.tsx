import { QRCodeCanvas } from 'qrcode.react'
import ColumnWithTitle from '../../chunk/ColumnWithTitle'
import ContentWithTitle from '../../chunk/ContentWithTitle'
import { qrcodeWrapper } from './index.css'
import InputText from '../../bit/InputText'
import Click from '../../bit/Click'
import SquareButton from '../../bit/SquareButton'
import { Player } from '../../../pages/Play'

export type SettingProps = {
  code?: string
  player: Player
  setPlayer: (player: Player) => void
}

const Setting: React.FC<SettingProps> = ({ code, player, setPlayer }) => {
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
        <InputText
          text={player.name}
          setText={(text) => {
            setPlayer({
              ...player,
              name: text,
            })
          }}
        />
      </ContentWithTitle>
      <ContentWithTitle title="全員そろうと始まります">
        <Click
          onClick={() => {
            if (player.name.length == 0) alert('プレイヤー名を入力してください')
            else
              setPlayer({
                ...player,
                state: 'ready',
              })
          }}
        >
          <SquareButton text="準備完了する" />
        </Click>
      </ContentWithTitle>
    </ColumnWithTitle>
  )
}

export default Setting
