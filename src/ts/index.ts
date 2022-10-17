import * as THREE from 'three'

import '../sass/index.scss'

const vshader = ``
const fshader = ``
// const canvas = document.getElementById('canvas')

// SCENE
const scene = new THREE.Scene()

// CAMERA
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)

// RENDERER
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(2, 2)
const material = new THREE.ShaderMaterial()
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)

camera.position.z = 1
const onWindowResize = () => {
    const aspectRatio = window.innerWidth / window.innerHeight
    let width, height
    if (aspectRatio >= 1) {
        width = 1
        height = (window.innerHeight / window.innerWidth) * width
    } else {
        width = aspectRatio
        height = 1
    }
    camera.left = -width
    camera.right = width
    camera.top = height
    camera.bottom = -height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
onWindowResize()
const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()
