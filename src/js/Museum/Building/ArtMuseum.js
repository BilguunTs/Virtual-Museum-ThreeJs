import World from "../World";

export default class ArtMuseum {
  constructor() {
    this.world = new World();

    this.scene = this.world.scene;

    this.statues = this.world.resourses.items;
    this.setModel();
  }
  setModel() {
    console.log(this.statues);
    for (let key in this.statues) {
      let instance = this.statues[key].scene;

      instance.position.set(1, 0, 0);
      this.scene.add(instance);
    }
    //this.scene.add(this.venusStatue);
    //this.venusStatue.scale.set(0.1, 0.1, 0.1);
  }
}
