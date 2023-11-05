import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Hider from './Hider'
import Seeker from './Seeker'
import Popup from './Popup'

export type HidingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Hiding: React.FC<HidingProps> = ({ uuid, code, game, socketRef }) => {
  if (uuid === game.hide?.player)
    return (
      <Popup {...{ uuid, game }}>
        <Hider {...{ uuid, code, game, socketRef }} />
      </Popup>
    )
  else
    return (
      <Popup {...{ uuid, game }}>
        <Seeker {...{ game }} />
      </Popup>
    )
}

export default Hiding
