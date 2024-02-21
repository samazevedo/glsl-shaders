import { IApp } from '../../types/interfaces'
import Box from './Box'
import OnMouseMove from './mouseMove/MouseMove'
import VaryngBox from './varyingBox/VaryingBox'

export default class World {
	private box!: Box
	private varyingBox!: VaryngBox
	private onMouseMove!: OnMouseMove
	public app: IApp

	constructor(app: IApp) {
		this.app = app

		this.setup()
	}
	private setup(): void {
		// initialize components once resources are loaded
		this.box = new Box(this.app)
		this.varyingBox = new VaryngBox(this.app)
		this.onMouseMove = new OnMouseMove(this.app)
	}
	public update(): void {
		this.box.update()
		this.varyingBox.update()
	}
}
