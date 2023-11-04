import { LineProps } from '..'
import { container, fill, stroke } from './index.css'

const Strong: React.FC<LineProps> = ({ text }) => {
  return (
    <div className={container}>
      <div className={stroke}>{text}</div>
      <div className={fill}>{text}</div>
    </div>
  )
}

export default Strong
