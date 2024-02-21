import * as dat from 'dat.gui'

export default class Debug {
	private active: boolean
	public ui: dat.ui
	constructor() {
		this.active = window.location.hash === '#debug'
		if (this.active) {
			this.ui = new dat.GUI()
		}
	}
}
