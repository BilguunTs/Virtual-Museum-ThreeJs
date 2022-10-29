import * as THREE from "three";

import Sizes from "./utils/Sizes.js";
import Time from "./utils/Time.js";
import Resourses from "./utils/Resourses.js";
import assets from "./utils/assets";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import Environment from "./Building/Environment.js";
import Building from "./Building/Building.js";
import PostProcessing from "./PostProcessing";
class World {
  static instance;
  constructor(canvas) {
    if (World.instance) {
      return World.instance;
    }
    World.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.resourses = new Resourses(assets);
    this.renderer = new Renderer();
    this.postPorcessing = new PostProcessing();

    this.building = new Building();

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("update", () => {
      this.update();
    });
  }
  update() {
    this.camera.update();
    this.building.update();
    this.renderer.update();
    this.postPorcessing.update();
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
}
export default World;
