import * as THREE from "three";
import World from "./World";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default class Camera {
  constructor() {
    this.world = new World();
    this.sizes = this.world.sizes;
    this.scene = this.world.scene;
    this.canvas = this.world.canvas;
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.perspectiveCamera.position.set(6, 15, 15);
    this.scene.add(this.perspectiveCamera);
  }
  createOrthographicCamera() {
    this.frustrum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.frustrum) / 2,
      (this.sizes.aspect * this.frustrum) / 2,
      this.frustrum / 2,
      -this.frustrum / 2,
      -100,
      100
    );
    this.setHelpers();
  }

  setHelpers() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }
  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
    this.orthographicCamera.left = (-this.sizes.aspect * this.frustrum) / 2;
    this.orthographicCamera.right = (this.sizes.aspect * this.frustrum) / 2;
    this.orthographicCamera.top = this.frustrum / 2;
    this.orthographicCamera.bottom = -this.frustrum / 2;
  }
  update() {
    this.controls.update();
  }
}
