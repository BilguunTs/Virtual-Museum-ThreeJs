import World from "../World";
import GSAP from "gsap";
import { ObjectNames } from "../helper";
//import CameraControls from "camera-controls";
import { MapControls } from "three/examples/jsm/controls/OrbitControls.js";
import Sizes from "../utils/Sizes";

import * as THREE from "three";

//CameraControls.install({ THREE: THREE });

export default class Controls {
  constructor() {
    this.world = new World();
    this.enteredMuseum = false;
    this.scene = this.world.scene;
    this.renderer = this.world.renderer;
    this.camera = this.world.camera;
    this.time = this.world.time;
    this.obj = this.world.building.artMuseum;
    this.sizes = new Sizes();
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

    this.initUI();

    this.setWorldDragControl();
    this.setCameraLookControl();
    this.setCursorPointControl();
  }

  setWorldDragControl() {
    this.dragControl = new MapControls(
      this.camera.perspectiveCamera,
      this.world.canvas
    );
    this.dragControl.target = new THREE.Vector3(0, 0, 15);
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
    this.heroContainer = document.getElementById("hero-container");
    this.wrapper = document.getElementById("cs");
    this.toolTip = document.getElementById("tooltip");

    GSAP.to(".content-action", {
      x: -this.sizes.width * 0.4,
      duration: 0.1,
      opacity: 0,
    });
    GSAP.to(".content-detail", {
      x: -this.sizes.width * 0.4,
      duration: 0.1,
      opacity: 0,
    });
    this.modelTitle = document.getElementById("model-name");
    this.modelDetail = document.getElementById("model-detail");
    this.modelAuthor = document.getElementById("model-author");
    this.modelDate = document.getElementById("model-date");

    this.startBtn = document.getElementById("start-btn");
    this.startBtn.addEventListener("click", () => {
      this.enterMuseum();
    });

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

  enterMuseum() {
    GSAP.to(".hero-container", {
      y: -this.sizes.height * 1.2,
    });
    this.enteredMuseum = true;
    this.setCameraPos(0, 5, 25);
    this.setCameraLookAt(0, 3, 0);
  }

  setCameraPos(x, y, z, f = { onComplete: () => {}, onStart: () => {} }) {
    GSAP.to(this.camera.perspectiveCamera.position, {
      x,
      y,
      z,
      duration: 3,
      ease: "back.inOut(1.2)",
      ...f,
    });
  }
  setCameraLookAt(x, y, z, f = { onComplete: () => {}, onStart: () => {} }) {
    GSAP.timeline().to(this.dragControl.target, {
      x,
      y,
      z,
      duration: 3,
      ease: "back.inOut(1.2)",
      ...f,
    });
  }
  handleBtnClick(type) {
    if (type == "cancel") {
      // this.wrapper.style.display = "none";
      this.setCameraPos(0, 5, 25, {
        onStart: () => {
          this.hideDetails();
          this.currentStatueIndex = undefined;
        },
      });
      this.setCameraLookAt(0, 3, 0);
    } else if (type == "next") {
      this.currentStatueIndex++;
      let target =
        ObjectNames.locations[
          this.currentStatueIndex == ObjectNames.locations.length - 1
            ? 0
            : this.currentStatueIndex
        ];
      this.setCameraLookAt(target.lookAt.x, target.lookAt.y, target.lookAt.z, {
        onStart: () => {
          this.hideDetails();
        },
      });
      this.setCameraPos(
        target.position.x,
        target.position.y,
        target.position.z,
        {
          onComplete: () => {
            this.setModelInfo(target);
            this.showDetails();
          },
        }
      );
    } else if (type == "pre") {
      this.currentStatueIndex--;
      let target =
        ObjectNames.locations[
          this.currentStatueIndex == 0
            ? ObjectNames.locations.length - 1
            : this.currentStatueIndex
        ];
      this.setCameraLookAt(target.lookAt.x, target.lookAt.y, target.lookAt.z, {
        onStart: () => this.hideDetails(),
      });
      this.setCameraPos(
        target.position.x,
        target.position.y,
        target.position.z,
        {
          onComplete: () => {
            this.setModelInfo(target);
            this.showDetails();
          },
        }
      );
    }
  }
  setCursorPointControl() {
    let intersects;
    let cur;
    window.addEventListener("mouseover", (e) => {
      this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.rayCaster.setFromCamera(
        this.mousePosition,
        this.camera.perspectiveCamera
      );

      intersects = this.rayCaster.intersectObjects(this.scene.children);
      intersects.forEach((o) => {
        for (const obj of ObjectNames.locations) {
          // if (
          //   o.object.name.includes(obj.statue) &&
          //   this.currentStatueIndex == undefined
          // ) {
          //   cur = obj.title;
          //   let left = e.pageX;
          //   let top = e.pageY;
          //   this.toolTip.innerHTML = `<p style='color:white'>${obj.title}</p>`;
          //   this.toolTip.style.left = left + "px";
          //   this.toolTip.style.top = top + "px";
          //   //     document.body.style.cursor = "pointer";
          // }
        }
      });
    });
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
                  ease: "back.inOut(1.2)",
                  onComplete: () => {
                    this.showDetails();
                    this.setModelInfo(ObjectNames.locations[i]);
                  },
                });
                GSAP.timeline().to(this.dragControl.target, {
                  x: ObjectNames.locations[i].lookAt.x,
                  y: ObjectNames.locations[i].lookAt.y,
                  z: ObjectNames.locations[i].lookAt.z,
                  duration: 3,
                  ease: "back.inOut(1.2)",
                });
              }
            }
          }
        }
      });
    });
  }
  hideDetails() {
    GSAP.to(".content-action", {
      x: -this.sizes.width * 0.3,
      opacity: 0,
      ease: "Power4.easeOut",
      duration: 1.5,
    });
    GSAP.timeline().to(".content-detail", {
      x: -this.sizes.width * 0.3,
      opacity: 0,
      ease: "Power4.easeOut",
      duration: 1.5,
    });
  }
  showDetails() {
    GSAP.to(".content-action", {
      x: 0,
      opacity: 1,
      ease: "Power4.easeOut",
      duration: 1.5,
    });
    GSAP.timeline().to(".content-detail", {
      opacity: 1,
      x: 0,
      ease: "Power4.easeOut",
      duration: 1.5,
    });
  }
  setModelInfo(model) {
    GSAP.from(".card-head", { y: 50, duration: 3 });
    this.modelTitle.innerHTML = model.title;
    this.modelDetail.innerHTML = model.about;
    this.modelAuthor.innerHTML = `Зохиогч: ${model.author}`;
    this.modelDate.innerHTML = `Хийсэн огноо: ${model.date}`;
  }
  update() {
    if (this.shouldDisableDrag == false) {
    }

    this.dragControl.update();
  }
}
