import * as THREE from "three";
import World from "../World";
import FloorTexture from "/textures/floor.png";
export default class Floor {
  constructor() {
    this.world = new World();
    this.scene = this.world.scene;
    this.setFloor();
  }

  setFloor() {
    this.texture = new THREE.TextureLoader().load(FloorTexture);

    this.geometry = new THREE.PlaneGeometry(400, 400);
    // this.material = new THREE.MeshLambertMaterial({
    //   // side: THREE.DoubleSide,
    //   // //  map: this.texture,
    //   // color: "brown",
    //   color: "#F00",
    //   emissive: "#0FF",
    // });
    this.material = new THREE.MeshStandardMaterial({
      color: "#eb4034",
      // color: "#e0c0ac",
      roughness: 0.2,
      metalness: 0.3,
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
