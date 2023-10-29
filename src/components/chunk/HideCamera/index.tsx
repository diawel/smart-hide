import { ReactNode } from 'react'
import { cameraWrapper, container, content } from './index.css'

export type HideCameraProps = {
  nodeIncludeCamera: ReactNode
  children: ReactNode
}

const HideCamera: React.FC<HideCameraProps> = ({
  nodeIncludeCamera,
  children,
}) => {
  return (
    <div className={container}>
      <div className={cameraWrapper}>{nodeIncludeCamera}</div>
      <div className={content}>{children}</div>
    </div>
  )
}

export default HideCamera
