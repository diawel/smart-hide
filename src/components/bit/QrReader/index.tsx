import { useEffect, useRef } from 'react'
import { video } from './index.css'
import jsQR from 'jsqr'

export type QrReaderProps = {
  setResult: (result: string) => void
}

const QrReader: React.FC<QrReaderProps> = ({ setResult }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const videoStreamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (
      video &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
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
          if (code) setResult(code.data)
          else setResult('')
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
  }, [setResult])

  return <video className={video} ref={videoRef} autoPlay muted playsInline />
}

export default QrReader
