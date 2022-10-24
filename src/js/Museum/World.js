import * as THREE from "three";

import Sizes from "./utils/Sizes.js";
import Time from "./utils/Time.js";
import Resourses from "./utils/Resourses.js";
import assets from "./utils/assets";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import Environment from "./Building/Environment.js";
import Building from "./Building/Building.js";

class World {
  static instance;
  constructor(canvas) {
    if (World.instance) {
      return World.instance;
    }
    World.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resourses = new Resourses(assets);

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
    this.renderer.update();
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
}
export default World;
