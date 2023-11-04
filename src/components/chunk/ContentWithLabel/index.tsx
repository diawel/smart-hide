import { ReactNode } from 'react'
import { container, label } from './index.css'

export type ContentWithLabelProps = {
  title: string
  children?: ReactNode
}

const ContentWithLabel: React.FC<ContentWithLabelProps> = ({
  title,
  children,
}) => {
  return (
    <div className={container}>
      <div className={label}>{title}</div>
      {children}
    </div>
  )
}

export default ContentWithLabel
