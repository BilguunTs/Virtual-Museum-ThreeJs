import * as THREE from "three";
import World from "./World";

export default class PreLoader {
  constructor() {
    this.world = new World();
    this.resourses = this.world.resourses;
    this.loadWrapper = document.getElementsByClassName("loader-wrapper")[0];
  }
  launchLoader() {}
  dispatchLoader() {
    document.getElementById("loader").remove();
  }
}
