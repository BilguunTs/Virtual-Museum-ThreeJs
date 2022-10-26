import * as THREE from "three";
import World from "../World";
export default class Environment {
  constructor() {
    this.world = new World();
    this.scene = this.world.scene;
    this.resourses = this.world.resourses;

    this.setSunlight();
  }
  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#e0c0ac", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(1.5, 60, 3);
    this.scene.add(this.sunLight);
    const ambientLight = new THREE.AmbientLight("#e0c0ac", 0.5);
    ambientLight.position.set(50, 100, 10);
    this.scene.add(ambientLight);
  }
}
