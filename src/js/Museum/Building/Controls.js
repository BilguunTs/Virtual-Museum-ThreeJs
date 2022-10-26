import World from "../World";
import GSAP from "gsap";
// import CameraControls from "camera-controls";
import { MapControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
// CameraControls.install({ THREE: THREE });
export default class Controls {
  constructor() {
    this.world = new World();

    this.scene = this.world.scene;
    this.renderer = this.world.renderer;
    this.camera = this.world.camera;
    this.time = this.world.time;
    this.progress = 0;
    this.obj = this.world.building.artMuseum;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    // this.lerp = {
    //   target: 0,
    //   current: 0,
    //   ease: 0.1,
    // };
    // this.position = new THREE.Vector3();
    // this.lookAt = new THREE.Vector3();
    // this.directionalVec = new THREE.Vector3();
    // this.staticVec = new THREE.Vector3(0, -1, 0);
    // this.crossVec = new THREE.Vector3();
    // this.museum = this.world.resourses.items.museum;
    // this.artMuseum = this.world.resourses.items.museum.scene;
    this.setPath();
    this.onWheel();
    this.setWorldDragControl();
    this.setCameraLookControl();
  }
  setWorldDragControl() {
    this.dragControl = new MapControls(
      this.camera.perspectiveCamera,
      this.world.canvas
    );
    this.dragControl.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.dragControl.dampingFactor = 0.05;

    this.dragControl.screenSpacePanning = false;
    this.dragControl.enableZoom = false;

    // this.dragControl.minDistance = 100;
    // this.dragControl.maxDistance = 500;

    this.dragControl.maxPolarAngle = Math.PI / 2;
  }
  setCameraLookControl() {
    // this.cameraControls = new CameraControls(
    //   this.camera.orthographicCamera,
    //   this.renderer.canvas
    // );
    //this.cameraControls.enabled = false;
    //this.cameraControls.mouseButtons.left = CameraControls.ACTION.TOUCH_TRUCK;
  }

  setPath() {
    // this.curve = new THREE.CatmullRomCurve3(
    //   [
    //     new THREE.Vector3(-10, 0, 10),
    //     new THREE.Vector3(-5, 5, 5),
    //     new THREE.Vector3(0, 0, 0),
    //     new THREE.Vector3(5, -5, 5),
    //     new THREE.Vector3(10, 0, 10),
    //   ],
    //   true
    // );
    // const points = this.curve.getPoints(50);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    // // Create the final object to add to the scene
    // const curveObject = new THREE.Line(geometry, material);
    // this.scene.add(curveObject);
  }
  onWheel() {
    // window.addEventListener("wheel", (e) => {
    //   if (e.deltaY > 0) {
    //     this.lerp.target += 0.01;
    //     this.back = false;
    //   } else {
    //     this.lerp.target -= 0.01;
    //     this.back = true;
    //   }
    // });
  }
  update() {
    this.dragControl.update();
    // this.cameraControls.update(this.time.delta);
    // this.lerp.current = GSAP.utils.interpolate(
    //   this.lerp.current,
    //   this.lerp.target,
    //   this.lerp.ease
    // );
    // this.curve.getPointAt(this.lerp.current % 1, this.position);
    // this.camera.orthographicCamera.position.copy(this.position);
    // this.directionalVec.subVectors(
    //   this.curve.getPointAt((this.lerp.current % 1) + 0.00001),
    //   this.position
    // );
    // this.directionalVec.normalize();
    // this.crossVec.crossVectors(this.directionalVec, this.staticVec);
    // this.crossVec.multiplyScalar(10000);
    // this.camera.orthographicCamera.lookAt(this.crossVec);
    // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
    // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
    // this.curve.getPointAt(this.lerp.current, this.position);
    // this.curve.getPointAt(this.lerp.current + 0.0001, this.lookAt);
    // this.camera.orthographicCamera.position.copy(this.position);
    // this.camera.orthographicCamera.lookAt(this.lookAt);
  }
}
