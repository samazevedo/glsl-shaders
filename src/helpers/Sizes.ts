import * as THREE from 'three'
import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
	public width: number
	public height: number
	public pixelRatio: number
	public mouse!: THREE.Vector2
	constructor() {
		super()

		// SET INITIAL SIZES
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)
		this.mouse = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)

		// RESIZE EVENT
		window.addEventListener('resize', this.onResize.bind(this))
	}

	private onResize(): void {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)

		this.emit('resize')
	}
}
