import { IApp } from '../../types/interfaces'
import Box from './Box'
export default class World {
	private box!: Box
	public app: IApp

	constructor(app: IApp) {
		this.app = app

		this.setup()
	}
	private setup(): void {
		// initialize components once resources are loaded
		this.box = new Box(this.app)
	}
	public update(): void {
		this.box.update()
	}
}
