import Click from '../../components/bit/Click'
import { useNavigate } from 'react-router-dom'
import GlobalWrapper from '../../components/chunk/GlobalWrapper'
import { container, control, graphic } from './index.css'
import Title from '../../components/bit/Title'
import RoundButton from '../../components/bit/RoundButton'

const Lobby: React.FC = () => {
  const navigate = useNavigate()
  return (
    <GlobalWrapper gradient>
      <div className={container}>
        <img className={graphic} src="/images/logo_background.svg" />
        <Title />
        <div className={control}>
          <Click
            onClick={() => {
              navigate(`/play/${crypto.randomUUID()}`)
            }}
          >
            <RoundButton text="部屋をつくる" />
          </Click>
          <Click
            onClick={() => {
              navigate('/join')
            }}
          >
            <RoundButton text="部屋に入る" />
          </Click>
        </div>
      </div>
    </GlobalWrapper>
  )
}

export default Lobby
