import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Hider from './Hider'
import Seeker from './Seeker'

export type HidingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Hiding: React.FC<HidingProps> = ({ uuid, code, game, socketRef }) => {
  if (uuid === game.hide?.player)
    return <Hider {...{ uuid, code, game, socketRef }} />
  else return <Seeker {...{ game }} />
}

export default Hiding
