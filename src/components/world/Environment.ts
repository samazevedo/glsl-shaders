import * as THREE from 'three'
import { IApp } from '../../types/interfaces'

export default class Environment {
	private app: IApp
	private ambientLight: THREE.AmbientLight
	private directionalLight: THREE.DirectionalLight

	constructor(app: IApp) {
		this.app = app

		this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
		this.app.scene.add(this.ambientLight)

		this.directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		this.directionalLight.position.set(1, 1, 1)
		this.app.scene.add(this.directionalLight)
	}
	public update(): void {}
}
// export default class Environment {
// 	public scene: THREE.Scene
// 	private sunLight!: THREE.DirectionalLight
// 	private resources: EnvironmentProps['resources']

// 	constructor(props: EnvironmentProps) {
// 		this.scene = props.scene
// 		this.resources = props.resources

// 		console.log(this.resources)
// 		this.setupDirectionalLight()
// 		this.setupEnvironmentMap()
// 	}

// 	private setupDirectionalLight(): void {
// 		this.sunLight = new THREE.DirectionalLight('#FFFFFF', 4)
// 		this.sunLight.castShadow = true
// 		this.sunLight.shadow.camera.far = 15
// 		this.sunLight.shadow.mapSize.set(1024, 1024)
// 		this.sunLight.shadow.normalBias = 0.05
// 		this.sunLight.position.set(3.5, 2, -1.25)

// 		this.scene.add(this.sunLight)
// 	}
// 	private setupEnvironmentMap(): void {
// 		const texture = this.resources.items.environmentMapTexture
// 		console.log(this.resources)

// 		texture.colorSpace = THREE.SRGBColorSpace
// 		this.scene.environment = texture

// 		this.updateSceneMaterial(texture)
// 	}
// 	private updateSceneMaterial(texture: THREE.Texture): void {
// 		const intensity = 0.3
// 		this.scene.traverse((child) => {
// 			if (
// 				child instanceof THREE.Mesh &&
// 				child.material instanceof THREE.MeshStandardMaterial
// 			) {
// 				child.material.envMap = texture
// 				child.material.envMapIntensity = intensity
// 				child.material.needsUpdate = true
// 			}
// 		})
// 	}
// }
