import { Game } from '../../../../pages/Play'
import { simpleAnimate } from '../../../../util/commonKeyframes.css'
import GameProgress from '../../../bit/GameProgress'
import ContentWithLabel from '../../../chunk/ContentWithLabel'
import GlobalWrapper from '../../../chunk/GlobalWrapper'
import Paragraph from '../../../chunk/Paragraph'
import Plain from '../../../chunk/Paragraph/Plain'
import Strong from '../../../chunk/Paragraph/Strong'
import { container } from './index.css'

export type SeekerProps = {
  game: Game
}

const Seeker: React.FC<SeekerProps> = ({ game }) => {
  return (
    <GlobalWrapper>
      <div className={container}>
        <Paragraph>
          <div className={simpleAnimate.slideIn}>
            <Strong text="その場で" />
          </div>
          <div
            className={simpleAnimate.slideIn}
            style={{ animationDelay: '0.6s' }}
          >
            <Plain text="情報を待て。" />
          </div>
          <div
            className={simpleAnimate.slideIn}
            style={{ animationDelay: '1.5s' }}
          >
            <Plain text="データチップの座標に関する情報が、じきに受信できる。" />
          </div>
        </Paragraph>
        <div
          className={simpleAnimate.fadeIn}
          style={{ animationDelay: '2.4s' }}
        >
          <ContentWithLabel title="アップロードされたデータの総量">
            <GameProgress {...{ game }} />
          </ContentWithLabel>
        </div>
      </div>
    </GlobalWrapper>
  )
}

export default Seeker
