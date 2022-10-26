import * as THREE from "three";
import World from "../World";
export default class Floor {
  constructor() {
    this.world = new World();
    this.scene = this.world.scene;
    this.setFloor();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshBasicMaterial({
      //side: THREE.DoubleSide,
      color: "brown",
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.plane.rotation.x = -(Math.PI / 2);
    this.plane.position.y = 0.2;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }
  resize() {}
  update() {}
}
