import { Game } from '../../../../pages/Play'
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
          <Strong text="その場で" />
          <Plain text="情報を待て。" />
          <Plain text="データチップの座標に関する情報が、じきに受信できる。" />
        </Paragraph>
        <ContentWithLabel title="アップロードされたデータの総量">
          <GameProgress {...{ game }} />
        </ContentWithLabel>
      </div>
    </GlobalWrapper>
  )
}

export default Seeker
