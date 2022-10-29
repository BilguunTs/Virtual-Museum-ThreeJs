import World from "../World";
import GSAP from "gsap";
import { ObjectNames } from "../helper";
//import CameraControls from "camera-controls";
import { MapControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from "three-tween";
import * as THREE from "three";

//CameraControls.install({ THREE: THREE });

export default class Controls {
  constructor() {
    this.world = new World();
    this.scene = this.world.scene;
    this.renderer = this.world.renderer;
    this.camera = this.world.camera;
    this.time = this.world.time;
    this.obj = this.world.building.artMuseum;

    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.progress = 0;
    this.lerp = {
      target: 0,
      current: 0,
      ease: 0.1,
    };
    this.shouldDisableDrag = false;
    this.targetPosition = new THREE.Vector3();
    this.lookAt = new THREE.Vector3();
    // this.directionalVec = new THREE.Vector3();
    // this.staticVec = new THREE.Vector3(0, -1, 0);
    // this.crossVec = new THREE.Vector3();
    // this.museum = this.world.resourses.items.museum;
    // this.artMuseum = this.world.resourses.items.museum.scene;

    this.setWorldDragControl();
    this.setCameraLookControl();
    this.initUI();
  }
  setWorldDragControl() {
    this.dragControl = new MapControls(
      this.camera.perspectiveCamera,
      this.world.canvas
    );
    this.dragControl.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.dragControl.dampingFactor = 0.05;

    this.dragControl.screenSpacePanning = true;
    this.dragControl.enableZoom = false;

    this.dragControl.enableRotate = true;
    // this.dragControl.minDistance = 100;
    // this.dragControl.maxDistance = 500;

    this.dragControl.maxPolarAngle = Math.PI / 2;
  }
  initUI() {
    this.wrapper = document.getElementById("cs");
    this.cancelButton = document
      .getElementById("btn-cancel")
      .addEventListener("click", () => {
        this.handleBtnClick("cancel");
      });
    this.nextButton = document
      .getElementById("btn-next")
      .addEventListener("click", () => {
        this.handleBtnClick("next");
      });
    this.preButton = document
      .getElementById("btn-pre")
      .addEventListener("click", () => {
        this.handleBtnClick("pre");
      });
  }
  setCameraPos(x, y, z) {
    GSAP.to(this.camera.perspectiveCamera.position, {
      x,
      y,
      z,
      duration: 3,
      ease: "back.inOut(1.5)",
    });
  }
  setCameraLookAt(x, y, z) {
    GSAP.timeline().to(this.dragControl.target, {
      x,
      y,
      z,
      duration: 3,
      ease: "back.inOut(1.4)",
    });
  }
  handleBtnClick(type) {
    if (type == "cancel") {
      this.wrapper.style.display = "none";
      this.setCameraPos(0, 5, 25);
      this.setCameraLookAt(0, 7, 0);
    } else if (type == "next") {
      this.currentStatueIndex++;
      let target =
        ObjectNames.locations[
          this.currentStatueIndex == ObjectNames.locations.length - 1
            ? 0
            : this.currentStatueIndex
        ];
      this.setCameraLookAt(target.lookAt.x, target.lookAt.y, target.lookAt.z);
      this.setCameraPos(
        target.position.x,
        target.position.y,
        target.position.z
      );
    } else if (type == "pre") {
      this.currentStatueIndex--;
      let target =
        ObjectNames.locations[
          this.currentStatueIndex == 0
            ? ObjectNames.locations.length - 1
            : this.currentStatueIndex
        ];
      this.setCameraLookAt(target.lookAt.x, target.lookAt.y, target.lookAt.z);
      this.setCameraPos(
        target.position.x,
        target.position.y,
        target.position.z
      );
    }
  }
  setCameraLookControl() {
    this.mousePosition = new THREE.Vector2();
    this.rayCaster = new THREE.Raycaster();
    let intersects;

    window.addEventListener("mousedown", (e) => {
      this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.rayCaster.setFromCamera(
        this.mousePosition,
        this.camera.perspectiveCamera
      );

      intersects = this.rayCaster.intersectObjects(this.scene.children);
      // if (intersects.length > 0) {
      //   let arrow = new THREE.ArrowHelper(
      //     this.rayCaster.ray.direction,
      //     this.rayCaster.ray.origin,
      //     1,
      //     0xff0000
      //   );
      //   this.scene.add(arrow);
      // }

      intersects.forEach((o) => {
        for (const [_, value] of Object.entries(ObjectNames.selectable)) {
          if (o.object.name.includes(value)) {
            for (let i = 0; i < ObjectNames.locations.length; i++) {
              if (ObjectNames.locations[i].statue === value) {
                this.currentStatueIndex = i;
                GSAP.to(this.camera.perspectiveCamera.position, {
                  x: ObjectNames.locations[i].position.x,
                  y: ObjectNames.locations[i].position.y,
                  z: ObjectNames.locations[i].position.z,
                  duration: 3,
                  ease: "back.inOut(1.5)",
                  onComplete: () => {
                    // document
                    //   .getElementById("action-wrapper")
                    //   .appendChild(this.cancelButton);
                    this.wrapper.style.display = "flex";
                    // GSAP.from(".card", { x: -500, duration: 1 });
                    // GSAP.from(".content-action", {
                    //   x: -500,
                    //   duration: 1,
                    // });
                  },
                });
                GSAP.timeline().to(this.dragControl.target, {
                  x: ObjectNames.locations[i].lookAt.x,
                  y: ObjectNames.locations[i].lookAt.y,
                  z: ObjectNames.locations[i].lookAt.z,
                  duration: 3,
                  ease: "back.inOut(1.4)",
                });
              }
            }
          }
        }
      });
    });
  }

  update() {
    if (this.shouldDisableDrag == false) {
    }

    this.dragControl.update();
  }
}
