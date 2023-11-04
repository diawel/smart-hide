import { QRCodeCanvas } from 'qrcode.react'
import {
  barcode,
  container,
  description,
  descriptionColumn,
  qrWrapper,
} from './index.css'

export type JoinBannerProps = {
  code?: string
}

const JoinBanner: React.FC<JoinBannerProps> = ({ code }) => {
  return (
    <div className={container}>
      <div className={qrWrapper}>
        <QRCodeCanvas
          value={`https://${location.host}/play/${code}`}
          style={{ width: '108px', height: '108px' }}
        />
      </div>
      <div className={descriptionColumn}>
        <div className={description}>
          他のスパイと繋がっておくと、情報が手に入る。
        </div>
        <img src="/images/barcode.svg" className={barcode} />
      </div>
    </div>
  )
}

export default JoinBanner
