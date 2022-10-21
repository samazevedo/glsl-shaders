import './header.scss';
class Header {
	render() {
		const h1 = document.createElement('h1');
		const body = document.querySelector('body');
		h1.innerHTML = 'GLSL Shaders';
		body?.appendChild(h1);
	}
}

export default Header;
