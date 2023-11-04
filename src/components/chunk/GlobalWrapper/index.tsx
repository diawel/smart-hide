import { container } from './index.css'

export type GlobalWrapperProps = {
  children?: React.ReactNode
  gradient?: boolean
}

const GlobalWrapper: React.FC<GlobalWrapperProps> = ({
  children,
  gradient,
}) => {
  return (
    <div className={gradient ? container.gradient : container.black}>
      {children}
    </div>
  )
}

export default GlobalWrapper
