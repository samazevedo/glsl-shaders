import './button.scss';
class HelloButton {
	btnClass = 'hello-world-button';
	render() {
		const button = document.createElement('button');
		button.innerHTML = 'Hello World';
		button.classList.add(this.btnClass);
		button.onclick = function () {
			const p = document.createElement('p');
			p.innerHTML = 'Hello World!!';
			body?.appendChild(p);
		};

		const body = document.querySelector('body');
		body?.appendChild(button);
	}
}
export default HelloButton;
