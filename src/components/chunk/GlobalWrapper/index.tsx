import { statusBarHeight } from '../../../main'
import { margin } from '../../../util/constants'
import { container, innerContainer } from './index.css'

export type GlobalWrapperProps = {
  children?: React.ReactNode
  gradient?: boolean
  fitScreen?: boolean
}

const GlobalWrapper: React.FC<GlobalWrapperProps> = ({
  children,
  gradient,
  fitScreen,
}) => {
  return (
    <div
      className={gradient ? container.gradient : container.black}
      style={{
        paddingTop: `${statusBarHeight}px`,
      }}
    >
      <div
        className={innerContainer}
        style={{
          height: fitScreen ? `calc(100svh - ${margin.buns * 2}px)` : 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default GlobalWrapper
