import { LineProps } from '..'
import { container } from './index.css'

const Strong: React.FC<LineProps> = ({ text }) => {
  return <div className={container}>{text}</div>
}

export default Strong
