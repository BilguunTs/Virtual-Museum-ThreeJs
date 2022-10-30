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
    //this.setOrbitControls();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      55,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.perspectiveCamera.position.set(0, 5, 25);
    this.scene.add(this.perspectiveCamera);
  }

  setHelpers() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    const size = 30;
    const divisions = 30;

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
    // this.perspectiveCamera.updateMatrix();
    // this.perspectiveCamera.updateMatrixWorld();
    // this.perspectiveCamera.updateProjectionMatrix();
    // this.perspectiveCamera.updateWorldMatrix();
    // this.controls.update();
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.perspectiveCamera.position);
    // this.helper.rotation.copy(this.perspectiveCamera.rotation);
  }
}
