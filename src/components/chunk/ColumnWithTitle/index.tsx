import { ReactNode } from 'react'
import { column, container } from './index.css'

export type ColumnWithTitleProps = {
  title: string
  children?: ReactNode
}

const ColumnWithTitle: React.FC<ColumnWithTitleProps> = ({
  title,
  children,
}) => {
  return (
    <div className={container}>
      <h1>{title}</h1>
      <div className={column}>{children}</div>
    </div>
  )
}

export default ColumnWithTitle
