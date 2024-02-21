import * as THREE from 'three'
import { IApp } from '../../types/interfaces'

export default class Renderer {
	private renderer: THREE.WebGLRenderer

	public constructor(private app: IApp) {
		this.app = app

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.app.canvas,
			antialias: true,
		})

		this.setupRenderer()
	}

	private setupRenderer(): void {
		this.renderer.setClearColor('#191B1D')
		this.renderer.setSize(this.app.sizes.width, this.app.sizes.height)
		this.renderer.setPixelRatio(this.app.sizes.pixelRatio)
	}

	public resize(): void {
		this.renderer.setSize(this.app.sizes.width, this.app.sizes.height)
		this.renderer.setPixelRatio(this.app.sizes.pixelRatio)
	}

	public update(): void {
		this.renderer.render(this.app.scene, this.app.camera.getCamera())
	}
}
