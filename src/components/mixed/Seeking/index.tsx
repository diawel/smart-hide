import { Game } from '../../../pages/Play'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Hider from './Hider'
import Seeker from './Seeker'

export type SeekingProps = {
  uuid: string
  code?: string
  game: Game
  socketRef: React.MutableRefObject<ReconnectingWebSocket | undefined>
}

const Seeking: React.FC<SeekingProps> = ({ uuid, code, game, socketRef }) => {
  if (uuid === game.seek?.target)
    return <Hider {...{ uuid, code, game, socketRef }} />
  else return <Seeker {...{ uuid, code, game, socketRef }} />
}

export default Seeking
