import { container } from './index.css'

export type GlobalWrapperProps = {
  children?: React.ReactNode
}

const GlobalWrapper: React.FC<GlobalWrapperProps> = ({ children }) => {
  return <div className={container}>{children}</div>
}

export default GlobalWrapper
