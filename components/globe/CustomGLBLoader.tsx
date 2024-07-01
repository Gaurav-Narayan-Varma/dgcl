"use client";

import React, { useEffect } from "react";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface CustomGLBLoaderProps {
  setObj: any;
}

const CustomGLBLoader: React.FC<CustomGLBLoaderProps> = ({ setObj }) => {
  const loader = new GLTFLoader();
  const globeUrl = "/Globe.glb"; // URL string to the .glb file

  function loadModel() {
    loader.load(
      globeUrl,
      function (gltf: GLTF) {
        if (gltf.scene) {
          const backgroundMesh = gltf.scene.getObjectByName("background");
          const PointLight = gltf.scene.getObjectByName("lightl");
          if (backgroundMesh) gltf.scene.remove(backgroundMesh);
          if (PointLight) gltf.scene.remove(PointLight);
          const PointLight1 = gltf.scene.getObjectByName("lightr");
          if (PointLight1) gltf.scene.remove(PointLight1);
          setObj(gltf.scene);
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

  return null; // Ensure the component returns something
};

export default CustomGLBLoader;
