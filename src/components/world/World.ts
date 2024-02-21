import { IApp } from '../../types/interfaces'
import Box from './Box'
import OnMouseMove from './mouseMove/MouseMove'
import VaryngBox from './varyingBox/VaryingBox'
import ColorTimeBox from './colorTime/ColorTime'

export default class World {
	private box!: Box
	private varyingBox!: VaryngBox
	private onMouseMove!: OnMouseMove
	private colorTimeBox!: ColorTimeBox
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
		this.colorTimeBox = new ColorTimeBox(this.app)
	}
	public update(): void {
		this.box.update()
		this.varyingBox.update()
		this.onMouseMove.update()
		this.colorTimeBox.update()
	}
}
