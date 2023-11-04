import { ReactNode } from 'react'
import { container } from './index.css'

export type LineProps = {
  text: string
}

export type Paragraph = {
  children: ReactNode
}

const Paragraph: React.FC<Paragraph> = ({ children }) => {
  return <div className={container}>{children}</div>
}

export default Paragraph
