import './style.css';

// Import
import * as THREE from 'three';

// Orbit Control for camera movement
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.setZ(30);

// Create and set a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
renderer.render(scene, camera); // No need to call when using animate()

// Create an object and add to the scene
// const material = new THREE.MeshBasicMaterial({
//     color: 0xFF6347,
//     wireframe: true
// });
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347 // Working with Light only
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);


// Create & add 2 lights to the scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambiantLight = new THREE.AmbientLight(0xffffff);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLight, ambiantLight, pointLightHelper);

// Create Gridhelper & add to the scene
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);


// Create Orbit Control & call in animte() function
const controls = new OrbitControls(camera, renderer.domElement);


// Add Random Objects e.g Stars
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);


// Add a background to the scene. E.g a Sky
const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
scene.background = spaceTexture;


// Object with Image e.g a box
const texture = new THREE.TextureLoader().load('./logo.png')
const box = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: texture })
)
scene.add(box);


// Object with an image & Normal Texture e.g Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
        normalScale: (1,1),
        roughness: 0.8,
        wireframe: false
    })
);
scene.add(moon);

// Animate Loop, to not call render() again & again
function animate(){
    requestAnimationFrame(animate);

    // Rotation
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // Add Orbit Control
    controls.update()

    renderer.render(scene, camera);
}

// Calling Animate function so it work
animate();