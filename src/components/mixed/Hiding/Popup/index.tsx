import { ReactNode, useEffect, useState } from 'react'
import { Game } from '../../../../pages/Play'
import { simpleAnimate } from '../../../../util/commonKeyframes.css'
import { gameConfig } from '../../../../util/constants'
import GlobalWrapper from '../../../chunk/GlobalWrapper'
import Paragraph from '../../../chunk/Paragraph'
import Plain from '../../../chunk/Paragraph/Plain'
import Strong from '../../../chunk/Paragraph/Strong'
import { container } from './index.css'

export type PopupProps = {
  uuid: string
  game: Game
  children: ReactNode
}

const Popup: React.FC<PopupProps> = ({ uuid, game, children }) => {
  const [showingPopup, setShowingPopup] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowingPopup(false)
    }, 3600)
  }, [])

  if (!showingPopup) return children
  if (game.hide?.player == uuid)
    return (
      <GlobalWrapper fitScreen>
        <div className={container}>
          <Paragraph>
            <div className={simpleAnimate.slideIn}>
              <Plain text="データチップを取得した。" />
            </div>
            <div
              className={simpleAnimate.slideIn}
              style={{ animationDelay: '0.6s' }}
            >
              <Strong text={`${gameConfig.hideDuration}秒以内`} />
            </div>
            <div
              className={simpleAnimate.slideIn}
              style={{ animationDelay: '1.5s' }}
            >
              <Plain text="に隠れる場所を見つけて、データチップをスキャンせよ。" />
            </div>
          </Paragraph>
        </div>
      </GlobalWrapper>
    )
  else
    return (
      <GlobalWrapper fitScreen>
        <div className={container}>
          <Paragraph>
            <div className={simpleAnimate.slideIn}>
              <Strong text={`${game.players[game.hide!.player].name}`} />
            </div>
            <div
              className={simpleAnimate.slideIn}
              style={{ animationDelay: '0.6s' }}
            >
              <Plain text="がデータチップを持ち出した。" />
            </div>
            <div
              className={simpleAnimate.slideIn}
              style={{ animationDelay: '1.2s' }}
            >
              <Plain text="情報を受信するまで、その場で待機せよ。" />
            </div>
          </Paragraph>
        </div>
      </GlobalWrapper>
    )
}

export default Popup
