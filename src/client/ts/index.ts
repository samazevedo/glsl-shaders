// import HelloButton from '../components/button/button';
import Header from '../components/header/header';
import '../sass/index.scss';

// import shaders
import vertex from '../glsl/shaders/vertex.glsl';
import fragment from '../glsl/shaders/fragment.glsl';

const header = new Header();
header.render();
// const hello = new HelloButton();
// hello.render();

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// DEFINE UNIFORM
const uniforms = {
	u_time: { value: 0.0 },
	u_mouse: { value: { x: 0.0, y: 0.0 } },
	u_resolution: { value: { x: 0.0, y: 0.0 } },
	u_color: { value: new THREE.Color(0x00ff00) }
};

const geometry = new THREE.BoxGeometry();
const material = new THREE.ShaderMaterial({
	uniforms,
	fragmentShader: `
	uniform vec2 u_mouse;
	uniform vec2 u_resolution;
	uniform vec3 u_color;

	void main(){
		vec2 v = u_mouse / u_resolution;
		vec3 color = vec3(v.x, 0.0,v.y);
		gl_FragColor = vec4(color, 1.0);
	}
	`
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const onWindowResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
	// if (uniforms.u_resolution !== undefined) {
	// 	uniforms.u_resolution.value.x = window.innerWidth;
	// 	uniforms.u_resolution.value.y = window.innerHeight;
	// }
};

const MouseMove = (evt: TouchEvent | MouseEvent) => {
	uniforms.u_mouse.value.x =
		evt instanceof TouchEvent ? evt.touches[0].clientX : evt.clientX;
	uniforms.u_mouse.value.y =
		evt instanceof TouchEvent ? evt.touches[0].clientY : evt.clientY;
	// if (evt instanceof TouchEvent) {
	// 	uniforms.u_mouse.value.x = evt.touches[0].clientX;
	// 	uniforms.u_mouse.value.y = evt.touches[0].clientY;
	// } else if (evt instanceof MouseEvent) {
	// 	uniforms.u_mouse.value.x = evt.clientX;
	// 	uniforms.u_mouse.value.y = evt.clientY;
	// }
	console.log(uniforms.u_mouse.value.x, uniforms.u_mouse.value.y);
};

if ('ontouchstart' in window) {
	document.addEventListener('touchmove', MouseMove);
} else {
	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousemove', MouseMove);
}

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	render();
}

const render = () => {
	renderer.render(scene, camera);
	if (uniforms.u_resolution !== undefined) {
		uniforms.u_resolution.value.x = window.innerWidth;
		uniforms.u_resolution.value.y = window.innerHeight;
	}
};

animate();

// CHECK MODE and SERVICE WORKER
if (process.env.NODE_ENV === 'production') {
	console.log('Production mode!!!');
} else if (process.env.NODE_ENV === 'development') {
	console.log('Development mode');
}

declare let process: {
	env: {
		NODE_ENV: string;
	};
};

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('SW registered: ', registration);
			})
			.catch((registrationError) => {
				console.log('SW registration failed: ', registrationError);
			});
	});
}
