// import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

// // Scene and Camera
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.localClippingEnabled = true;
// document.body.appendChild(renderer.domElement);

// // OrbitControls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// // Lighting
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambientLight);

// const directionalLight1 = new THREE.DirectionalLight(0xff0000, 0.5);
// directionalLight1.position.set(5, 10, 7.5);
// scene.add(directionalLight1);

// const directionalLight2 = new THREE.DirectionalLight(0x0000ff, 0.5);
// directionalLight2.position.set(-5, -10, -7.5);
// scene.add(directionalLight2);

// const pointLight = new THREE.PointLight(0xffffff, 1, 50);
// pointLight.position.set(0, 5, 0);
// scene.add(pointLight);

// // Clipping Plane
// const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);

// // Create geometries with bright colors and materials
// function createWildGeometry() {
//     const group = new THREE.Group();

//     const geometries = [
//         new THREE.TorusGeometry(1, 0.4, 16, 100),
//         new THREE.IcosahedronGeometry(1, 0),
//         new THREE.DodecahedronGeometry(1, 0),
//         new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
//         new THREE.ConeGeometry(1, 2, 32),
//         new THREE.BoxGeometry(1.5, 1.5, 1.5)
//     ];

//     const materials = [
//         new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x660000, roughness: 0.5, metalness: 0.5 }),
//         new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x006600, roughness: 0.5, metalness: 0.5 }),
//         new THREE.MeshStandardMaterial({ color: 0x0000ff, emissive: 0x000066, roughness: 0.5, metalness: 0.5 }),
//         new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0x666600, roughness: 0.5, metalness: 0.5 }),
//         new THREE.MeshStandardMaterial({ color: 0xff00ff, emissive: 0x660066, roughness: 0.5, metalness: 0.5 }),
//         new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x006666, roughness: 0.5, metalness: 0.5 }),
//     ];

//     for (let i = 0; i < geometries.length; i++) {
//         const mesh = new THREE.Mesh(geometries[i], materials[i % materials.length]);
//         mesh.position.set(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3);
//         mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
//         mesh.scale.setScalar(Math.random() * 1.5 + 0.5);
//         group.add(mesh);
//     }

//     return group;
// }

// const wildGeometries = createWildGeometry();
// scene.add(wildGeometries);

// // Adjusting the camera position and rotation
// camera.position.set(10, 10, 10);
// controls.target.set(0, 0, 0);
// controls.update();

// // Animation
// const animate = function () {
//     requestAnimationFrame(animate);

//     wildGeometries.rotation.x += 0.01;
//     wildGeometries.rotation.y += 0.01;

//     controls.update();
//     renderer.render(scene, camera);
// };

// animate();


import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.target.set(0, 0, 0);  // Set the target to the center of the scene

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Room (Walls)
// const roomGeometry = new THREE.BoxGeometry(20, 10, 20);
// const roomMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.BackSide });
// const room = new THREE.Mesh(roomGeometry, roomMaterial);
// scene.add(room);

// Table
const tableGeometry = new THREE.BoxGeometry(5, 0.3, 3);
const tableMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
const tableTop = new THREE.Mesh(tableGeometry, tableMaterial);
tableTop.position.set(0, 2, 0);
tableTop.rotation.y = Math.PI / 2; // Rotate 90 degrees around the y-axis
scene.add(tableTop);

const legGeometry = new THREE.BoxGeometry(0.3, 2, 0.3);
const legMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });

const legs = [];
for (let i = 0; i < 4; i++) {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    legs.push(leg);
    scene.add(leg);
}

// Rotate the legs' positions accordingly
legs[0].position.set(1.35, 1, 2.35);
legs[1].position.set(-1.35, 1, 2.35);
legs[2].position.set(1.35, 1, -2.35);
legs[3].position.set(-1.35, 1, -2.35);


// Easel
const easelMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
const easelGeometry = new THREE.BoxGeometry(0.2, 5, 0.2);
const easel1 = new THREE.Mesh(easelGeometry, easelMaterial);
easel1.position.set(-4, 2.5, -4);
scene.add(easel1);

const easel2 = new THREE.Mesh(easelGeometry, easelMaterial);
easel2.position.set(-3.6, 2.5, -4);
easel2.rotation.z = -0.3;
scene.add(easel2);

const easelCrossbarGeometry = new THREE.BoxGeometry(1, 0.2, 0.2);
const easelCrossbar = new THREE.Mesh(easelCrossbarGeometry, easelMaterial);
easelCrossbar.position.set(-3.8, 2, -4);
scene.add(easelCrossbar);

// Canvas
const canvasGeometry = new THREE.PlaneGeometry(3, 4);
const canvasMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
canvas.position.set(-3.8, 3.5, -3.95);
scene.add(canvas);

// Paint Supplies
const paintGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
const paintMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const paint1 = new THREE.Mesh(paintGeometry, paintMaterial);
paint1.position.set(1, 2.2, 1);
scene.add(paint1);

const paintMaterial2 = new THREE.MeshBasicMaterial({ color: 0x444444 });
const paint2 = new THREE.Mesh(paintGeometry, paintMaterial2);
paint2.position.set(1.5, 2.2, 1);
scene.add(paint2);

// Street Sign
const signPostGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 32);
const signPostMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const signPost = new THREE.Mesh(signPostGeometry, signPostMaterial);
signPost.position.set(4, 3, 4);
scene.add(signPost);

function createSign(text, width, height) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.font = '30px Arial';
    context.fillText(text, 10, 50);
    const texture = new THREE.CanvasTexture(canvas);
    const signGeometry = new THREE.BoxGeometry(width, height, 0.1);
    const signMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    return sign;
}

const sign1 = createSign('Studio', 2, 0.5);
sign1.position.set(4, 4.5, 4);
sign1.rotation.y = Math.PI / 4;
sign1.userData = { url: 'studio.html' };
scene.add(sign1);

const sign2 = createSign('Gallery', 2, 0.5);
sign2.position.set(4, 4.5, 4);
sign2.rotation.y = -Math.PI / 4;
sign2.userData = { url: 'gallery.html' };
scene.add(sign2);

const sign3 = createSign('Office', 2, 0.5);
sign3.position.set(4, 5, 4);
sign3.rotation.y = Math.PI / 2;
sign3.userData = { url: 'office.html' };
scene.add(sign3);

// Abstract Shapes with Clipping
// const globalPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1);

// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide, clippingPlanes: [globalPlane] });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere.position.set(-2, 2, 2);
// scene.add(sphere);

// const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
// const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide, clippingPlanes: [globalPlane] });
// const torus = new THREE.Mesh(torusGeometry, torusMaterial);
// torus.position.set(0, 3, -2);
// scene.add(torus);

// const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide, clippingPlanes: [globalPlane] });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.position.set(2, 2, 0);
// scene.add(cube);

// Adjusting the camera position and rotation
camera.position.set(7, 5, 7);
camera.rotation.y = Math.PI / 4;
controls.update();

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData.url) {
            window.location.href = clickedObject.userData.url;
        }
    }
}

window.addEventListener('click', onMouseClick, false);

const animate = function () {
    requestAnimationFrame(animate);

    // Animate the shapes
    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.01;

    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.01;

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
};

renderer.localClippingEnabled = true;
animate();