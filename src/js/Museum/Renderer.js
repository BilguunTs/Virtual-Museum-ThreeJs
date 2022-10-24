import * as THREE from "three";
import World from "./World";

export default class Renderer {
  constructor() {
    this.world = new World();
    this.sizes = this.world.sizes;
    this.scene = this.world.scene;
    this.canvas = this.world.canvas;
    this.camera = this.world.camera;
    this.setRenderer();
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }
  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }
  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
