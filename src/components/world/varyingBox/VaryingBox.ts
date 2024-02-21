import * as THREE from 'three'
import { IApp } from '../../../types/interfaces'
import vertex from './box.vert'
import fragment from './box.frag'

export default class VaryngBox {
	private mesh: THREE.Mesh
	private geometry: THREE.BoxGeometry
	private material: THREE.ShaderMaterial

	private clock: THREE.Clock

	constructor(private app: IApp) {
		this.app = app
		const uniforms = {
			u_time: { value: 1.0 },
			u_mouse: { value: new THREE.Vector2() },
			u_resolution: {
				value: new THREE.Vector2(this.app.sizes.width, this.app.sizes.height),
			},
			u_color: { value: new THREE.Color(0x00ff00) },
		}

		this.clock = new THREE.Clock()

		this.geometry = new THREE.BoxGeometry(2, 2, 2)
		this.material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertex,
			fragmentShader: fragment,
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.x += 3
		this.app.scene.add(this.mesh)
	}

	public update() {
		// update u_mouse and u_resolution values
		// this.material.uniforms.u_mouse.value.set(
		// 	this.app.sizes.mouse.x,
		// 	this.app.sizes.mouse.y
		// )
		// this.material.uniforms.u_resolution.value.set(
		// 	this.app.sizes.width,
		// 	this.app.sizes.height
		// )

		//update u_time value
		this.material.uniforms.u_time.value = this.clock.getElapsedTime()
		this.mesh.rotation.y += 0.02
		this.mesh.rotation.x += 0.02
	}
}
