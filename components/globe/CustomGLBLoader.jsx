"use client";

import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Globe from "@/public/Globe.glb";

const CustomGLBLoader = ({ setObj }) => {
  const loader = new GLTFLoader();
  function loadModel() {
    loader.load(
      Globe,
      function (object) {
        if (object.scene) {
          const backgroundMesh = object.scene.getObjectByName("background");
          const PointLight = object.scene.getObjectByName("lightl");
          object?.scene.remove(backgroundMesh);
          object?.scene.remove(PointLight);
          const PointLight1 = object.scene.getObjectByName("lightr");
          object?.scene.remove(PointLight1);
          setObj(object.scene);
        } else {
          console.log("No mesh found");
        }
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened", error);
      }
    );
  }
  useEffect(() => {
    loadModel();
  }, []);
};

export default CustomGLBLoader;
