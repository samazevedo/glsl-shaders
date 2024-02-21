import * as THREE from 'three'
import { IApp } from '../../types/interfaces'
import vertex from './box.vert'
import fragment from './box.frag'

export default class Box {
	private mesh: THREE.Mesh

	private geometry: THREE.OctahedronGeometry
	private material: THREE.ShaderMaterial

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
		this.geometry = new THREE.OctahedronGeometry(10, 0)
		this.material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertex,
			fragmentShader: fragment,
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.app.scene.add(this.mesh)
	}

	public update() {
		this.material.uniforms.u_mouse.value.set(
			this.app.sizes.mouse.x,
			this.app.sizes.mouse.y
		)
		this.material.uniforms.u_resolution.value.set(
			this.app.sizes.width,
			this.app.sizes.height
		)
	}
}
