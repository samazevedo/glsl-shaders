import * as THREE from 'three'
import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
	public width: number
	public height: number
	public pixelRatio: number
	public mouse: THREE.Vector2
	constructor() {
		super()

		// SET INITIAL SIZES
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.mouse = new THREE.Vector2(0, 0)
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)

		// RESIZE EVENT
		window.addEventListener('resize', this.onResize.bind(this))

		// MOUSE MOVE EVENT
		// window.addEventListener('mousemove', (event: MouseEvent) =>
		// 	this.onMouseMove(event)
		// )
		this.onMouseMove = this.onMouseMove.bind(this)
		window.addEventListener('mousemove', (event: MouseEvent) =>
			this.onMouseMove(event)
		)
	}
	private onMouseMove(event: MouseEvent) {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
		this.mouse.y = (event.clientY / window.innerHeight) * 2 + 1
	}

	private onResize(): void {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)

		this.emit('resize')
	}
}
