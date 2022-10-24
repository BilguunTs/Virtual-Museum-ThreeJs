import World from "../World";
import ArtMuseum from "./ArtMuseum";
import Environment from "./Environment";

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
    });
  }
}
