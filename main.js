import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set(0, 0, 10); // Adjust the camera position as needed

let hlight = new THREE.AmbientLight(0x404040, 1); // Adjust the intensity as needed
scene.add(hlight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); // Use a public URL or local path
loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
loader.load(
    'models/gltf/duck/duck.gltf',
    function (gltf) {
        scene.add(gltf.scene);
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened', error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
