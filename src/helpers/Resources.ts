import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import EventEmitter from './EventEmitter'
import { IResourceData, ResourceType } from '../types/interfaces'

export default class Resources extends EventEmitter {
	private resources = new Map<string, any>()
	private totalResources: number
	private loadedResources = 0

	constructor(resourceData: IResourceData[]) {
		super()
		this.totalResources = resourceData.length
		if (this.totalResources === 0) {
			this.emit('resourcesLoaded')
			console.log('no resources to load!')
			return
		} else {
			resourceData.forEach((resource) => this.loadResource(resource))
		}
	}

	private loadResource(resourceData: IResourceData): void {
		let loader = null

		switch (resourceData.type) {
			case ResourceType.Texture: {
				loader = new THREE.TextureLoader()
				loader.load(resourceData.path as string, (file) => {
					this.resources.set(resourceData.name, file)
					this.resourceLoaded(resourceData, file)
				})
				break
			}
			case ResourceType.GLTFModel: {
				loader = new GLTFLoader()
				loader.load(resourceData.path as string, (file) => {
					this.resources.set(resourceData.name, file)
					this.resourceLoaded(resourceData, file)
				})
				break
			}
			case ResourceType.CubeTexture: {
				loader = new THREE.CubeTextureLoader()
				loader.load(
					resourceData.path as string[],
					(file) => {
						this.resources.set(resourceData.name, file)
						this.resourceLoaded(resourceData, file)
					},
					undefined,
					(error) => {
						console.error('error loading cubetexture', error)
					}
				)
			}
		}
	}

	private resourceLoaded = (resourceData: IResourceData, file: any): void => {
		console.log(resourceData, file)
		this.loadedResources++
		this.emit('resourcesLoaded', this.resources)

		if (this.loadedResources === this.totalResources) {
			this.emit('allResourcesLoaded', resourceData, file)
		}
	}

	public getResource(name: string): any {
		return this.resources.get(name)
	}
}
