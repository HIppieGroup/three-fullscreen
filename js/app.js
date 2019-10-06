import * as THREE from 'three';
import {TimelineMax} from 'gsap';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';
const OrbitControls = require('three-orbit-controls')(THREE);

import image1 from '../assets/img4.jpg';

export default class App {
  constructor(container) {
    window.addEventListener('resize', this.resize);

    this.time = 0;
    this.initScene(container);
    this.initBasePlane();
    this.animate();
    this.resize();
  }

  initScene = (container) => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);

    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      innerWidth/innerHeight,
      0.001,
      100,
    );

    this.camera.position.set(0,0,1);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  };

  initBasePlane() {
    const texture1 = new THREE.TextureLoader().load(image1);

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 },
        pixels: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uvRate1: { value: new THREE.Vector2(1, 1) },
        texture1: { value: texture1 },
      },
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    const geometry = new THREE.PlaneGeometry(1,1, 1, 1);
    this.plane = new THREE.Mesh(geometry, this.material);

    this.scene.add(this.plane);
  };

  animate = () => {
    this.time = this.time+0.05;
    this.material.uniforms.time.value = this.time;

    requestAnimationFrame(this.animate);
    this.render();
  }

  resize = () => {
    const { innerWidth, innerHeight } = window;
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;

    const dist = this.camera.position.z - this.plane.position.z;
    const height = 1;
    this.camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist));

    if (innerWidth > innerHeight) {
      this.material.uniforms.uvRate1.value.y = innerHeight/innerWidth;
      this.material.uniforms.uvRate1.value.x = 1;
      this.plane.scale.x = innerWidth/innerHeight;
      this.plane.scale.y = 1;
    } else {
      this.material.uniforms.uvRate1.value.x = innerWidth/innerHeight;
      this.material.uniforms.uvRate1.value.y = 1;
      this.plane.scale.y = innerHeight/innerWidth;
      this.plane.scale.x = 1;
    }

    this.camera.updateProjectionMatrix();
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
