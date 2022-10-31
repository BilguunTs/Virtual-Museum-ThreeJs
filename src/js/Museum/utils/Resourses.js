import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import World from "../World";

export default class Resourses extends EventEmitter {
  constructor(assets) {
    super();
    this.world = new World();
    this.renderer = this.world.renderer;
    this.preloader = this.world.preLoader;
    this.assets = assets;

    this.items = {};

    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.startLoadOnUI();
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    for (let asset of this.assets) {
      if (asset.type === "glb-model") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      }
    }
  }
  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;

    this.loaded++;
    if (this.loaded === this.assets.length) {
      this.endLoadOnUI();
      this.emit("ready");
    }
  }
  startLoadOnUI() {
    this.preloader.launchLoader();
  }
  endLoadOnUI() {
    this.preloader.dispatchLoader();
  }
}
