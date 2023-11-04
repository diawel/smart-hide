import { useEffect, useRef } from 'react'
import { output } from './index.css'

export type ShuffledImageProps = {
  src: string
}

const width = 512
const height = 512
const chunkX = 5
const chunkY = 5

const ShuffledImage: React.FC<ShuffledImageProps> = ({ src }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        const image = new Image()
        image.src = src
        image.onload = () => {
          context.drawImage(image, 0, 0, width, height)
          for (let y = 0; y < chunkY; y++) {
            for (let x = 0; x < chunkX; x++) {
              if (Math.random() < 0.3) continue
              const imageData = context.getImageData(
                x * (width / chunkX),
                y * (height / chunkY),
                width / chunkX,
                height / chunkY
              )
              context.putImageData(
                imageData,
                Math.floor(Math.random() * chunkX) * (width / chunkX),
                Math.floor(Math.random() * chunkY) * (height / chunkY)
              )
            }
          }
        }
      }
    }
  }, [src])

  return <canvas {...{ width, height }} ref={canvasRef} className={output} />
}

export default ShuffledImage
