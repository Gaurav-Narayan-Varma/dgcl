"use client";

import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";
import React, { MutableRefObject } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  obj: THREE.Object3D | null;
  target: string;
  controlsRef: MutableRefObject<null>;
}

const Model: React.FC<ModelProps> = ({ obj, target, controlsRef }) => {
  const { scene, camera } = useThree();
  useEffect(() => {
    if (target) {
      const targetObject = scene.getObjectByName(target);
      if (targetObject) {
        if (target === "usa") {
          gsap.to(scene.rotation, {
            duration: 2.5,
            x: 0.3,
            y: 2.85,
            z: 0,
            ease: "power1.out",
          });
        } else if (target === "india") {
          gsap.to(scene.rotation, {
            duration: 2.5,
            x: 0,
            y: -0.1,
            z: 0,
            ease: "power1.out",
          });
        }
      }
    }
  }, [target, scene, camera]);
  return <>{obj && <primitive object={obj} />}</>;
};

export default Model;
