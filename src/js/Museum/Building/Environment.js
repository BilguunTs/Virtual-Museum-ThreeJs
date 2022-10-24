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
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(1.5, 7, 3);
    this.world.scene.add(this.sunLight);
  }
}
