import { click } from './index.css'

export type ClickProps = {
  onClick: () => void
  children: React.ReactNode
}

const Click: React.FC<ClickProps> = ({ onClick, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick()
  }
  return (
    <a onClick={handleClick} href="./" className={click}>
      {children}
    </a>
  )
}

export default Click
