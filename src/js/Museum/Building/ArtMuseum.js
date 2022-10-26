import World from "../World";
import * as THREE from "three";

export default class ArtMuseum {
  constructor() {
    this.world = new World();

    this.scene = this.world.scene;

    this.museum = this.world.resourses.items.museum;
    this.artMuseum = this.world.resourses.items.museum.scene;
    this.setModel();
  }
  setModel() {
    console.log(this.artMuseum);
    this.artMuseum.children.forEach((child) => {
      child.castShadow = true;
      child.recieveShadow = true;
      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }
    });
    // for (let key in this.museum) {
    //   let instance = this.museum[key].scene;
    //   this.scene.add(instance);
    // }
    this.artMuseum.rotation.y = -(Math.PI / 2);
    this.scene.add(this.artMuseum);
    //this.venusStatue.scale.set(0.1, 0.1, 0.1);
  }
  update() {}
  resize() {}
}
