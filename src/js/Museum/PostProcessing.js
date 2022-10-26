import World from "./World";
import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  DepthOfFieldEffect,
} from "postprocessing";
export default class PostProcessing {
  constructor() {
    this.world = new World();
    this.renderer = this.world.renderer;
    this.scene = this.world.scene;
    this.camera = this.world.camera;
    this.time = this.world.time;
    this.setEffect();
  }

  setEffect() {
    this.composer = new EffectComposer(this.renderer.renderer);
    this.composer.addPass(
      new RenderPass(this.scene, this.camera.perspectiveCamera)
    );
    const dofEffect = new DepthOfFieldEffect();

    this.composer.addPass(
      new EffectPass(this.camera, new DepthOfFieldEffect())
    );
    // this.composer = new EffectComposer(this.renderer.renderer);
    // this.composer.addPass(
    //   new RenderPass(this.scene, this.camera.orthographicCamera)
    // );
    // const effectPass = new EffectPass();
    // effectPass.renderToScreen = true;
  }
  update() {
    this.composer.render(this.time.delta);
  }
}
