import { container } from './index.css'

export type SquareButtonProps = {
  text: string
}

const SquareButton: React.FC<SquareButtonProps> = ({ text }) => {
  return <div className={container}>{text}</div>
}

export default SquareButton
