import * as THREE from "three";
import World from "../World";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { ObjectNames } from "../helper";

export default class Environment {
  constructor() {
    this.world = new World();
    this.scene = this.world.scene;
    this.resourses = this.world.resourses;

    this.setLight();
    this.setFog();
  }
  setLight() {
    this.sealLight = new THREE.RectAreaLight("#e0c0ac", 0.4, 30, 30);

    // for (const statue of ObjectNames.locations) {
    //   let instance = new THREE.PointLight("#ffffff", 0.5);
    //   instance.position.set(statue.position.x, 0.1, statue.position.z);
    //   this.scene.add(instance);
    // }
    this.sealLight.position.set(0, 10, 0);
    this.sealLight.rotateX(-(Math.PI / 2));
    this.scene.add(this.sealLight);
    this.ambientLight = new THREE.AmbientLight("#e0c0ac", 0.2);
    this.ambientLight.position.set(0, 10, 0);
    this.scene.add(this.ambientLight);
    //const rectLightHelper = new RectAreaLightHelper(this.sealLight);
    // this.sealLight.add(rectLightHelper);
  }
  setFog() {
    this.scene.fog = new THREE.FogExp2("#9e8d82", 0.01);
    this.scene.background = new THREE.Color("#9e8d82");
  }
}
