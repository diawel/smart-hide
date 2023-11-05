import { ReactNode, useEffect, useState } from 'react'
import { simpleAnimate } from '../../../../util/commonKeyframes.css'
import GlobalWrapper from '../../../chunk/GlobalWrapper'
import Paragraph from '../../../chunk/Paragraph'
import Strong from '../../../chunk/Paragraph/Strong'
import { container, innerContainer } from './index.css'

export type PopupProps = {
  children: ReactNode
}

const Popup: React.FC<PopupProps> = ({ children }) => {
  const [showingPopup, setShowingPopup] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowingPopup(false)
    }, 3600)
  }, [])
  return (
    <>
      {children}
      {showingPopup && (
        <div className={container}>
          <GlobalWrapper fitScreen>
            <div className={innerContainer}>
              <Paragraph>
                <div className={simpleAnimate.slideIn}>
                  <Strong text="ミッション終了" />
                </div>
              </Paragraph>
            </div>
          </GlobalWrapper>
        </div>
      )}
    </>
  )
}

export default Popup
