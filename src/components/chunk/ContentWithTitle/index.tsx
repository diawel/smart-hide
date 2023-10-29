import { ReactNode } from 'react'
import { titleWrapper } from './index.css'

export type ContentWithTitleProps = {
  title: string
  children?: ReactNode
}

const ContentWithTitle: React.FC<ContentWithTitleProps> = ({
  title,
  children,
}) => {
  return (
    <div>
      <div className={titleWrapper}>{title}</div>
      {children}
    </div>
  )
}

export default ContentWithTitle
