import { useEffect, useRef } from 'react'
import { output } from './index.css'

export type ShuffledImageProps = {
  src: string
}

const width = 512
const height = 512
const chunkX = 5
const chunkY = 5

class Random {
  x: number
  y: number
  z: number
  w: number
  constructor(seed = 88675123) {
    this.x = 123456789
    this.y = 362436069
    this.z = 521288629
    this.w = seed
  }
  next() {
    const t = this.x ^ (this.x << 11)
    this.x = this.y
    this.y = this.z
    this.z = this.w
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)))
  }
  nextInt(min: number, max: number) {
    const r = Math.abs(this.next())
    return min + (r % (max + 1 - min))
  }
}

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
          const random = new Random(src.length)
          for (let y = 0; y < chunkY; y++) {
            for (let x = 0; x < chunkX; x++) {
              const imageData = context.getImageData(
                x * (width / chunkX),
                y * (height / chunkY),
                width / chunkX,
                height / chunkY
              )
              context.putImageData(
                imageData,
                random.nextInt(0, chunkX) * (width / chunkX),
                random.nextInt(0, chunkY) * (height / chunkY)
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
