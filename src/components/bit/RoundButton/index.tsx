import { container } from './index.css'

export type RoundButtonProps = {
  text: string
}

const RoundButton: React.FC<RoundButtonProps> = ({ text }) => {
  return <div className={container}>{text}</div>
}

export default RoundButton
