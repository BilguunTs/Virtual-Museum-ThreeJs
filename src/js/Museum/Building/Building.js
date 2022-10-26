import World from "../World";
import ArtMuseum from "./ArtMuseum";
import Environment from "./Environment";
import Controls from "./Controls";
import Floor from "./Floor";
export default class Building {
  constructor() {
    this.world = new World();
    this.sizes = this.world.sizes;
    this.scene = this.world.scene;
    this.canvas = this.world.canvas;
    this.camera = this.world.camera;
    this.resourses = this.world.resourses;

    this.resourses.on("ready", () => {
      this.artMuseum = new ArtMuseum();
      this.environment = new Environment();
      this.Floor = new Floor();
      this.controls = new Controls();
    });
  }

  update() {
    if (this.artMuseum) {
      this.artMuseum.update();
    }
    if (this.controls) {
      this.controls.update();
    }
    if (this.Floor) {
      this.Floor.update();
    }
  }
}
