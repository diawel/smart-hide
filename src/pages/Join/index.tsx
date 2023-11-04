import { useNavigate } from 'react-router-dom'
import QrReader from '../../components/bit/QrReader'
import GlobalWrapper from '../../components/chunk/GlobalWrapper'
import { container, qrReaderWrapper } from './index.css'
import Title from '../../components/bit/Title'
import ContentWithLabel from '../../components/chunk/ContentWithLabel'

const Join: React.FC = () => {
  const navigate = useNavigate()

  return (
    <GlobalWrapper>
      <div className={container}>
        <Title />
        <ContentWithLabel title="二次元コードを読み取って参加">
          <div className={qrReaderWrapper}>
            <QrReader
              setResult={(result) => {
                const match = result.match(/^https:\/\/.*\/play\/(.*)$/)
                if (match?.length == 2) navigate(`/play/${match[1]}`)
              }}
            />
          </div>
        </ContentWithLabel>
      </div>
    </GlobalWrapper>
  )
}

export default Join
