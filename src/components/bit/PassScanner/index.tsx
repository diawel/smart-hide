import { useEffect, useRef } from 'react'
import { canvas, container, video } from './index.css'
import jsQR from 'jsqr'

export type PassScannerProps = {
  onScan: (result: string) => void
}

const PassScanner: React.FC<PassScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const videoStreamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (
      video &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment' },
        })
        .then((stream) => {
          video.srcObject = stream
          videoStreamRef.current = stream
        })
    }

    const animationFrame = () => {
      if (videoRef.current?.videoWidth && videoRef.current?.videoHeight) {
        const canvas = document.createElement('canvas')
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        const context = canvas.getContext('2d')
        if (context) {
          context.drawImage(
            videoRef.current,
            0,
            0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          )
          const imageData = context.getImageData(
            0,
            0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          )
          const code = jsQR(imageData.data, imageData.width, imageData.height)

          // console.log(
          //   imageData.width / 2,
          //   code?.location.topLeftCorner.x,
          //   (imageData.height * 4) / 5,
          //   code?.location.topLeftCorner.y
          // )

          if (
            code?.data == 'smart-hide:pass' &&
            imageData.width / 2 < code.location.topLeftCorner.x &&
            (imageData.height * 4) / 5 < code.location.topLeftCorner.y
          ) {
            onScan(canvas.toDataURL())
          }
        }
      }
      animationRef.current = requestAnimationFrame(animationFrame)
    }
    animationRef.current = requestAnimationFrame(animationFrame)

    return () => {
      if (videoStreamRef.current)
        videoStreamRef.current.getTracks().forEach((track) => track.stop())
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [onScan])

  return (
    <div className={container}>
      <video className={video} ref={videoRef} autoPlay muted playsInline />
      <canvas className={canvas} ref={canvasRef} />
    </div>
  )
}

export default PassScanner
