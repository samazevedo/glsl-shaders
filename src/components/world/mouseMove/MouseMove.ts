import * as THREE from 'three'
import { IApp } from '../../../types/interfaces'
import vertex from './box.vert'
import fragment from './box.frag'

export default class OnMouseMove {
	private mesh: THREE.Mesh

	private geometry: THREE.BoxGeometry
	private material: THREE.ShaderMaterial
	private clock: THREE.Clock
	private mouse: THREE.Vector2

	constructor(private app: IApp) {
		this.app = app
		this.mouse = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)
		const uniforms = {
			u_time: { value: 1.0 },
			u_mouse: { value: this.mouse },
			u_resolution: {
				value: new THREE.Vector2(this.app.sizes.width, this.app.sizes.height),
			},
			u_color: { value: new THREE.Color(0x00ff00) },
		}

		this.clock = new THREE.Clock()

		this.geometry = new THREE.BoxGeometry(5, 5, 5)
		this.material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertex,
			fragmentShader: fragment,
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.x -= 5
		this.app.scene.add(this.mesh)

		// MOUSE MOVE EVENT
		window.addEventListener('mousemove', this.onMouseMove.bind(this))
		window.addEventListener('touchmove', this.onTouchMove.bind(this), {
			passive: false,
		})
	}
	private onMouseMove(event: MouseEvent) {
		event.preventDefault()
		if (this.mesh.material instanceof THREE.ShaderMaterial) {
			this.mesh.material.uniforms.u_mouse.value = new THREE.Vector2(
				event.clientX / window.innerWidth,
				event.clientY / window.innerHeight
			)
		}
	}

	private onTouchMove(event: TouchEvent) {
		event.preventDefault()
		if (event.touches.length > 0) {
			const touch = event.touches[0]
			this.mouse = new THREE.Vector2(
				touch.clientX / window.innerWidth,
				touch.clientY / window.innerHeight
			)
		}
	}

	public update() {
		// update u_mouse and u_resolution values
		if (this.mesh.material instanceof THREE.ShaderMaterial) {
			this.mesh.material.uniforms.u_resolution.value.x = window.innerWidth
			this.mesh.material.uniforms.u_resolution.value.y = window.innerWidth
		}

		//update u_time value
		// this.material.uniforms.u_time.value = this.clock.getElapsedTime()
		// this.mesh.rotation.x += 0.001
		// this.mesh.rotation.y += 0.001
	}
}
