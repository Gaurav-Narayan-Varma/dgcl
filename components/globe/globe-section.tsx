"use client";

import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CustomGLBLoader from "@/components/globe/CustomGLBLoader";
import Model from "@/components/globe/Model";

export default function GlobeSection() {
  const [obj, setObj] = useState(null);
  const [target, setTarget] = useState("india");
  const controlsRef = useRef(null);
  return (
    <main id="globe-container" className="h-dvh">
      <Suspense fallback={null}>
        <Canvas
          style={{ height: "100%", width: "100%", backgroundColor: "white" }}
          camera={{
            fov: 70,
            position: [0, 0, 1],
          }}
        >
          <ambientLight intensity={10} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enableRotate={false}
          />
          <CustomGLBLoader setObj={setObj} />
          <Model obj={obj} target={target} controlsRef={controlsRef} />
        </Canvas>
      </Suspense>
      <div className="flex">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTarget("usa");
          }}
        >
          USA
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTarget("india");
          }}
        >
          India
        </button>
      </div>
    </main>
  );
}
