import { useNavigate } from 'react-router-dom'
import ColumnWithTitle from '../../components/chunk/ColumnWithTitle'
import QrReader from '../../components/bit/QrReader'
import ContentWithTitle from '../../components/chunk/ContentWithTitle'
import GlobalWrapper from '../../components/chunk/GlobalWrapper'

const Join: React.FC = () => {
  const navigate = useNavigate()
  return (
    <GlobalWrapper>
      <ColumnWithTitle title="未来大げっさー">
        <ContentWithTitle title="2次元コードを読み取る">
          <QrReader
            setResult={(result) => {
              const match = result.match(/^https:\/\/.*\/play\/(.*)$/)

              if (match?.length == 2) navigate(`/play/${match[1]}`)
            }}
          />
        </ContentWithTitle>
      </ColumnWithTitle>
    </GlobalWrapper>
  )
}

export default Join
