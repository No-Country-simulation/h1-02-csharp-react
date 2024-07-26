import { useEffect, useRef } from "react"

const CircularProgressBar = ({ datasets }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const lineWidth = 10

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar anillos
    datasets.forEach((dataset, index) => {
      const radius = (canvas.width / 2) - (lineWidth * (index + 1))
      const startAngle = -0.5 * Math.PI
      const endAngle = (dataset.percentage / 100) * 2 * Math.PI - 0.5 * Math.PI

      // Fondo del anillo
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = 'transparent'
      ctx.lineWidth = lineWidth
      ctx.stroke()

      // Progreso del anillo
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.strokeStyle = dataset.color
      ctx.lineWidth = lineWidth
      ctx.stroke()
    })
  }, [datasets])

  return <canvas ref={canvasRef} width="200" height="200"></canvas>
}

export default CircularProgressBar
