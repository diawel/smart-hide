import { useEffect, useRef } from 'react'
import { canvas, container, video } from './index.css'

export type PassScannerProps = {
  onScan: (result: string) => void
}

const markers = [
  [30, 30],
  [200, 30],
  [300, 30],
  [450, 30],
  [30, 200],
  [470, 200],
  [30, 500],
  [470, 500],
  [30, 670],
  [200, 670],
  [300, 670],
  [470, 670],
  [300, 570],
]

const rgbToHsl = (rgb: [number, number, number]) => {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0
  const l = (max + min) / 2
  const s =
    1 - Math.abs(max + min - 1) ? diff / (1 - Math.abs(max + min - 1)) : 0

  switch (min) {
    case max:
      h = 0
      break

    case r:
      h = 60 * ((b - g) / diff) + 180
      break

    case g:
      h = 60 * ((r - b) / diff) + 300
      break

    case b:
      h = 60 * ((g - r) / diff) + 60
      break
  }

  return [h, s, l]
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
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          video.srcObject = stream
          videoStreamRef.current = stream
        })
    }

    const animationFrame = () => {
      if (
        videoRef.current?.videoWidth &&
        videoRef.current?.videoHeight &&
        canvasRef.current
      ) {
        const canvas = canvasRef.current
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        const context = canvas.getContext('2d')
        if (context) {
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
          const imageData = context.getImageData(
            0,
            0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          )
          let hSum = 0
          let sSum = 0
          let vSum = 0
          const unit = Math.min(
            videoRef.current.videoWidth / canvas.width,
            videoRef.current.videoHeight / canvas.height
          )
          const width = Math.floor(unit * canvas.width)
          const height = Math.floor(unit * canvas.height)

          const markersHsl = markers.map((marker) => {
            const index =
              Math.floor(
                (canvas.height - height) / 2 + (marker[1] * height) / 700
              ) *
                imageData.width +
              Math.floor(
                (canvas.width - width) / 2 + (marker[0] * width) / 500
              ) *
                4
            return rgbToHsl([
              imageData.data[index],
              imageData.data[index + 1],
              imageData.data[index + 2],
            ])
          })
          markersHsl.forEach((marker) => {
            hSum += marker[0]
            sSum += marker[1]
            vSum += marker[2]
          })
          const hAverage = hSum / markersHsl.length
          const sAverage = sSum / markersHsl.length
          const vAverage = vSum / markersHsl.length
          let hDistanceSum = 0
          let sDistanceSum = 0
          markersHsl.forEach((marker) => {
            hDistanceSum += (marker[0] - hAverage) ** 2
            sDistanceSum += (marker[1] - sAverage) ** 2
          })
          const hDist = Math.sqrt(hDistanceSum / markersHsl.length)
          const sDist = Math.sqrt(sDistanceSum / markersHsl.length)
          console.log(hAverage, sAverage, hDist, sDist)
          if (
            60 < hAverage &&
            hAverage < 65 &&
            0.1 < sAverage &&
            sDist < 0.2 &&
            0.2 < vAverage
          )
            onScan(canvas.toDataURL())
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
