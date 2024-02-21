import * as THREE from 'three'
import { Sizes, Time, Resources } from '../helpers'
import { Camera, Renderer, World } from '../components'
import { sources } from '../source'
import { IApp } from '../types/interfaces'

interface CanvasElement extends HTMLCanvasElement {}

export default class APP implements IApp {
	// private debug: Debug
	private static instance: APP
	public canvas: HTMLCanvasElement
	public sizes: Sizes
	public time: Time
	public scene: THREE.Scene
	public camera: Camera
	public renderer: Renderer
	public resources: Resources
	public world!: World

	private constructor(canvas: CanvasElement) {
		//SETUP
		// this.debug = new Debug()
		this.canvas = canvas
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new THREE.Scene()
		this.camera = new Camera(this)
		this.renderer = new Renderer(this)
		this.resources = new Resources(sources)

		this.addEventListeners()
	}

	// create a static method that checks if an instance already exists
	public static getInstance(canvas?: CanvasElement): APP {
		if (!APP.instance) {
			if (!canvas) {
				throw new Error('CANNOT instatiate APP without a canvas element.')
			}
			APP.instance = new APP(canvas)
		}
		return APP.instance
	}

	private addEventListeners() {
		// resize
		this.sizes.on('resize', this.resize.bind(this))
		// animation loop
		this.time.on('animate', this.update.bind(this))

		// loading resources
		this.world = new World(this)
		this.resources.on('resourcesLoaded', () => {
			console.log('hello')
		})
	}

	public resize() {
		this.camera.resize()
		this.renderer.resize()
	}
	public update() {
		this.camera.update()
		this.renderer.update()
		this.world.update()
	}
	public destroy() {}

	// destroy(): void {
	//     this.sizes.off('resize');
	//     this.time.off('animate');

	//     // traverse the whole scene
	//     this.scene.traverse((child) => {
	//         if (child instanceof THREE.Mesh) {
	//             child.geometry.dispose();

	//             if (child.material instanceof THREE.Material) {
	//                 child.material.dispose();
	//             } else if (Array.isArray(child.material)) {
	//                 child.material.forEach((material) => {
	//                     if (material instanceof THREE.Material) {
	//                         material.dispose();
	//                     }
	//                 });
	//             }
	//         }
	//     });

	//     // dispose camera controls
	//     this.cameraService.controls.dispose();
	//     // dispose renderer
	//     this.rendererService.renderer.dispose();

	//     // debug UI
	//     if (this.debug.active) {
	//         this.debug.ui.destroy();
	//     }
	// }
}
