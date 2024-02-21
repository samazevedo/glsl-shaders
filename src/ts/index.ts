import '../scss/style.scss'
import '../scss/style.scss'
import APP from './App'

window.addEventListener('DOMContentLoaded', () => {
	const canvasElement = document.getElementById('webgl') as HTMLCanvasElement
	if (!canvasElement) return console.error('Failed to load canvas!')

	APP.getInstance(canvasElement)
})
